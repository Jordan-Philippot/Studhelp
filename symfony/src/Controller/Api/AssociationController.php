<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Association;
use App\Repository\AssociationRepository;

use DateTime;
use Symfony\Component\HttpClient\HttpClient;

class AssociationController extends AbstractController
{
    /**
     * @Route("/api/getassociations", name="api_get_association")
     */
    public function getAssociations(Request $request, AssociationRepository $associationRepository)
    {
        $data = json_decode($request->getContent(), true);
        $latitude = floatval($data['lat']);
        $longitude = floatval($data['lng']);
        $perimeter = intval($data['perimeter']);

        $nearMe = [];
        $allAssociations = $associationRepository->findAll();

        $latitudeFrom = $latitude;
        $longitudeFrom = $longitude;

        // We check distance between user and each association ( search is in front)
        foreach ($allAssociations as $assoc) {
            $latitudeTo = $assoc->getLatitude();
            $longitudeTo = $assoc->getLongitude();

            //Calculate distance from latitude and longitude
            $theta = $longitudeFrom - $longitudeTo;
            $dist = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $distance = ($miles * 1.609344);

            if ($distance <= $perimeter) {
                $nearMe[] = [
                    "title" => $assoc->getTitre(),
                    "titleShort" => $assoc->getTitreCourt(),
                    "description" => $assoc->getDescription(),
                    "address" => $assoc->getAdresseSiege(),
                    "website" => $assoc->getSiteWeb(),
                ];
            }
        }


        return new JsonResponse([
            'nearMe' => $nearMe,
        ]);
    }


    /**
     * @Route("/api/getrnaapi", name="api_get_rna_api")
     */
    public function getRnaApi(Request $request)
    {
        // A GARDER EN STOCK
        // Appel de l'api RNA : prise de position (long, lat) avec l'adresse, puis insertion des position
        // Ensuite, prise de distance entre le user et l'adresse de l'association
        $data = json_decode($request->getContent(), true);
        $latitude = floatval($data['lat']);
        $longitude = floatval($data['lng']);

        // Get all Associations with page
        $httpClient = HttpClient::create();
        $response = $httpClient->request(
            'GET',
            'https://entreprise.data.gouv.fr/api/rna/v1/full_text/étudiant',
            [
                'query' => [
                    'per_page' => '100',
                    'page' => '14'
                ],
            ]
        );
        $associations = $response->toArray();

        $nearMe = [];
        // Get all address
        foreach ($associations['association'] as $key) {
            $currentAssoc = $key;
            switch ($key['adresse_type_voie']) {
                case "AV":
                    $voie = "Avenue";
                    break;
                case "RTE":
                    $voie = "Route";
                case "RUE":
                    $voie = "Rue";
                    break;
                default:
                    $voie = $key['adresse_type_voie'];
                    break;
            }
            // Formate address
            $address =   $key['adresse_numero_voie'] . '+' .  $voie . '+' .  str_replace(" ", "+", $key['adresse_libelle_voie']);
            $addressDb =   $key['adresse_numero_voie'] . ' ' .  $voie . ' ' .  $key['adresse_libelle_voie'] . ', ' . $key['adresse_libelle_commune'];

            // Get longitude and latitude with address association
            $httpClient = HttpClient::create();
            $responseCoords = $httpClient->request(
                'GET',
                "https://maps.googleapis.com/maps/api/geocode/json?address=" . $address . ',' . $key['adresse_libelle_commune'] . "&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU",
            );
            $coords = $responseCoords->toArray();

            // Insert all Associations
            $dateCreation = new DateTime($key['date_creation']);
            $dateDerniereDeclaration = new DateTime($key['date_derniere_declaration']);
            $dateDeclarationDissolution = new DateTime($key['date_declaration_dissolution']);

            $dateCreation->format('Y-m-d H:i:s');
            $dateDerniereDeclaration->format('Y-m-d H:i:s');
            $dateDeclarationDissolution->format('Y-m-d H:i:s');

            $newAssociation = new Association();
            $newAssociation->setIdAssociation($key['id_association']);
            $newAssociation->setSiret($key['siret']);
            $newAssociation->setDateCreation($dateCreation);
            $newAssociation->setDateDerniereDeclaration($dateDerniereDeclaration);
            $newAssociation->setDateDeclarationDissolution($dateDeclarationDissolution);
            $newAssociation->setTitre($key['titre']);
            $newAssociation->setTitreCourt($key['titre_court']);
            $newAssociation->setDescription($key['objet']);
            $newAssociation->setAdresseSiege($addressDb);
            $newAssociation->setSiteWeb($key['site_web']);
            $newAssociation->setCreatedAt(new DateTime($key['created_at']));
            $newAssociation->setUpdatedAt(new DateTime($key['updated_at']));


            // Get distance between user and association
            foreach ($coords['results'] as $key) {
                $httpClient = HttpClient::create();
                $responseDistance = $httpClient->request(
                    'GET',
                    'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' . $latitude . ',' . $longitude . '&destinations=' . $key['geometry']['location']['lat'] . ',' . $key['geometry']['location']['lng'] . '&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU',
                );

                $newAssociation->setLatitude($key['geometry']['location']['lat']);
                $newAssociation->setLongitude($key['geometry']['location']['lng']);

                $distance = $responseDistance->toArray();
                foreach ($distance['rows'] as $key) {
                    foreach ($key['elements'] as $key) {
                        if (isset($key['distance']['text'])) {
                            $miles = (int) filter_var($key['distance']['text'], FILTER_SANITIZE_NUMBER_INT);
                            $kilometers = $miles * 1.609;
                            if ($kilometers <= 20) {
                                $nearMe[] = $currentAssoc;
                            }
                        };
                    }
                }
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($newAssociation);
            $em->flush();
            // = $coords['results'];
        }

        return new JsonResponse([
            'nearMe' => "top",
            // 'distance' => $allDistance,
            // 'miles' => $miles
            // 'coords' => $allCoords
        ]);
    }
}

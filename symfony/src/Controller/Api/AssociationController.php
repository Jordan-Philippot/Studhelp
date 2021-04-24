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
     * @Route("/api/associations", name="api_get_association")
     */
    public function getAssociations(Request $request, AssociationRepository $associationRepository)
    {
        $data = json_decode($request->getContent(), true);
        $latitude = floatval($data['lat']);
        $longitude = floatval($data['lng']);
        $perimeter = intval($data['perimeter']);
        $searchBar = $data['searchBar'];

        $nearMe = [];

        if ($searchBar !== '' && strlen($searchBar) > 0) {
            $allAssociations = $associationRepository->findBySearch($searchBar);
            dump($allAssociations);
        } else {
            $allAssociations = $associationRepository->findAll();
        }

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
     * @Route("/api/association/{id}", name="api_post_events")
     */
    public function getAssociation(AssociationRepository $associationRepository, $id)
    {
        $errors = [];
        $associationEntity = $associationRepository->findOneBy(['id' => $id]);

        if ($associationEntity == null) {
            $association = null;
        } else {
            $association = [
                "title" => $associationEntity->getTitre()
            ];
        }

        return $this->json([
            'success' => $association
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

            if ($key['date_declaration_dissolution'] == null) {
                $dateCreation->format('Y-m-d H:i:s');
                $dateDerniereDeclaration->format('Y-m-d H:i:s');

                $newAssociation = new Association();
                $newAssociation->setIdAssociation($key['id_association']);
                $newAssociation->setSiret($key['siret']);
                $newAssociation->setDateCreation($dateCreation);
                $newAssociation->setDateDerniereDeclaration($dateDerniereDeclaration);
                $newAssociation->setTitre($key['titre']);
                $newAssociation->setTitreCourt($key['titre_court']);
                $newAssociation->setDescription($key['objet']);
                $newAssociation->setAdresseSiege($addressDb);
                $newAssociation->setSiteWeb($key['site_web']);
                $newAssociation->setCreatedAt(new DateTime($key['created_at']));
                $newAssociation->setUpdatedAt(new DateTime($key['updated_at']));


                // Get distance between user and association
                foreach ($coords['results'] as $key) {
                    $newAssociation->setLatitude($key['geometry']['location']['lat']);
                    $newAssociation->setLongitude($key['geometry']['location']['lng']);
                }
                $em = $this->getDoctrine()->getManager();
                $em->persist($newAssociation);
                $em->flush();
            }
        }

        return new JsonResponse([
            'nearMe' => "ok"
        ]);
    }

}

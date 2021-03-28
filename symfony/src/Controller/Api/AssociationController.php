<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

// use GuzzleHttp\Psr7\Request;
// use GuzzleHttp\Client;
// use GuzzleHttp;
use Symfony\Component\HttpClient\HttpClient;

// use Guzzle\Http\Client;
class AssociationController extends AbstractController
{
    /**
     * @Route("/api/getassociations", name="api_get_association")
     */
    public function getAssociations(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $latitude = floatval($data['lat']);
        $longitude = floatval($data['lng']);

        // Get all Associations
        $httpClient = HttpClient::create();
        $response = $httpClient->request(
            'GET',
            'https://entreprise.data.gouv.fr/api/rna/v1/full_text/étudiant',
            [
                'query' => [
                    'per_page' => '100',
                    'page' => '5'
                ],
            ]
        );
        $associations = $response->toArray();

        // $allCoords = [];
        // $allDistance = [];
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

            // Get longitude and latitude with address association
            $httpClient = HttpClient::create();
            $responseCoords = $httpClient->request(
                'GET',
                "https://maps.googleapis.com/maps/api/geocode/json?address=" . $address . ',' . $key['adresse_libelle_commune'] . "&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU",
            );
            $coords = $responseCoords->toArray();

            // Get distance between user and association
            foreach ($coords['results'] as $key) {
                // $allCoords[] = $key['geometry'];
                $httpClient = HttpClient::create();
                $responseDistance = $httpClient->request(
                    'GET',
                    'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' . $latitude . ',' . $longitude . '&destinations=' . $key['geometry']['location']['lat'] . ',' . $key['geometry']['location']['lng'] . '&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU',
                );
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
                // $allDistance[] = $distance;
            }
            // = $coords['results'];
        }

        return new JsonResponse([
            'nearMe' => $nearMe,
            // 'distance' => $allDistance,
            // 'miles' => $miles
            // 'coords' => $allCoords
        ]);
    }
}

<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\EventRepository;

class EventController extends AbstractController
{
    /**
     * @Route("/api/events", name="api_get_events")
     */
    public function getEvents(Request $request, EventRepository $eventRepository)
    {
        $data = json_decode($request->getContent(), true);
        $latitude = floatval($data['lat']);
        $longitude = floatval($data['lng']);
        $perimeter = intval($data['perimeter']);

        $nearMe = [];
        $allEvents = $eventRepository->findAll();

        $latitudeFrom = $latitude;
        $longitudeFrom = $longitude;

        if ($perimeter > 0) {
            foreach ($allEvents as $event) {
                $latitudeTo = $event->getLatitude();
                $longitudeTo = $event->getLongitude();
                
                //Calculate distance from latitude and longitude
                $theta = $longitudeFrom - $longitudeTo;
                $dist = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
                $dist = acos($dist);
                $dist = rad2deg($dist);
                $miles = $dist * 60 * 1.1515;
                $distance = ($miles * 1.609344);

                if ($distance <= $perimeter) {
                    $nearMe[] = $event;
                }
            }
        }else{

        }

        dump($nearMe);

        return new JsonResponse([
            'nearMe' => $nearMe,
        ]);
    }
}

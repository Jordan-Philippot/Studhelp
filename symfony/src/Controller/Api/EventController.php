<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\EventRepository;

use App\Entity\Event;

use Symfony\Component\HttpClient\HttpClient;
use Datetime;

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
        $perimeter = $data['perimeter'];
        $searchBar = $data['searchBar'];
        $orderBy = $data['orderBy'];

        $now = new Datetime();
        $nearMe = [];

        if ($searchBar !== '' && strlen($searchBar) > 0) {
            $allEvents = $eventRepository->findBySearch($searchBar);
            dump($allEvents);
        } else {
            $allEvents = $eventRepository->findAll();
        }

        $latitudeFrom = $latitude;
        $longitudeFrom = $longitude;

        // We check distance between user and each association ( search is in front)
        foreach ($allEvents as $event) {

            if ($event->getStartedAt() > $now) {
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
                    $nearMe[] = [
                        "id" => $event->getId(),
                        "admin" => $event->getAdmin(),
                        "type" => $event->gettype(),
                        "title" => $event->getTitle(),
                        "description" => $event->getDescription(),
                        "startedAt" => $event->getStartedAt(),
                        "duration" => $event->getDuration(),
                        "organisation" => $event->getOrganisation(),
                        "location" => $event->getLocation(),
                        "distance" => round($distance, 1)
                    ];
                }
            }
        }

        if (isset($orderBy) && ($orderBy == 'title' || $orderBy == 'distance')) {
            $orderBy  = array_column($nearMe, $orderBy);
            // Trie les données par distance ou titre croissant
            // Ajoute tableau en tant que dernier paramètre, pour trier par la clé commune
            array_multisort($orderBy, SORT_ASC, $nearMe);
        }

        return new JsonResponse([
            'nearMe' => $nearMe,
        ]);
    }

    /**
     * @Route("/api/event/{id}", name="api_get_event")
     */
    public function getEvent(EventRepository $eventRepository, $id)
    {
        $now = new DateTime();

        $eventEntity = $eventRepository->findOneBy(['id' => $id]);
        $participants = $eventEntity->getParticipants();

        $numberOfParticipants = count($participants);

        if ($eventEntity == null) {
            $event = null;
        } else {
            if ($eventEntity->getStartedAt() > $now) {
                $passed = false;
            } else {
                $passed = true;
            }

            $event = [
                "id" => $eventEntity->getId(),
                "admin" => $eventEntity->getAdmin()->getEmail(),
                "type" => $eventEntity->gettype(),
                "title" => $eventEntity->getTitle(),
                "description" => $eventEntity->getDescription(),
                "startedAt" => $eventEntity->getStartedAt(),
                "duration" => $eventEntity->getDuration(),
                "organisation" => $eventEntity->getOrganisation(),
                "location" => $eventEntity->getLocation(),
                "isPassed" => $passed,
                "numberOfParticipants" => $numberOfParticipants
            ];
        }

        return $this->json([
            'event' => $event
        ]);
    }


    /**
     * @Route("/api/auth/event/remove/{id}", name="api_remove_event")
     */
    public function removeEvent(EventRepository $eventRepository, $id)
    {
        $user = $this->getUser();

        $eventEntity = $eventRepository->findOneBy(['id' => $id]);
        if ($eventEntity !== null) {
            if ($eventEntity->getAdmin()->getId() == $user->getId()) {
                $em = $this->getDoctrine()->getManager();
                $em->remove($eventEntity);
                $em->flush();
                $success = true;
            }
        } else {
            $success = false;
        }


        return $this->json([
            'success' => $success
        ]);
    }

    /**
     * @Route("/api/auth/eventsByUser", name="api_auth_events_by_user")
     */
    public function eventByUser(EventRepository $eventRepository)
    {
        $user = $this->getUser();
        $eventsByUser = $eventRepository->findBy(['admin' => $user->getId()]);
        dump($eventsByUser);
        $myEvents = [];
        if ($eventsByUser !== null) {
            foreach ($eventsByUser as $event) {
                $myEvents[] = [
                    "id" => $event->getId(),
                    "admin" => $event->getAdmin()->getId(),
                    "type" => $event->gettype(),
                    "title" => $event->getTitle(),
                    "description" => $event->getDescription(),
                    "startedAt" => $event->getStartedAt(),
                    "duration" => $event->getDuration(),
                    "organisation" => $event->getOrganisation(),
                    "location" => $event->getLocation(),
                ];
            }
        }

        return $this->json([
            'myevents' => $myEvents
        ]);
    }

    /**
     * @Route("/api/auth/event", name="api_auth_post_event")
     */
    public function insertEvent(Request $request, EventRepository $eventRepository)
    {
        $errors = [];

        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $event = new Event;
        $event->setAdmin($user);

        $now = new DateTime();
        dump($data);
        foreach ($data as $key => $value) {
            if (empty($value)) {
                $errors[$key] = "Veuillez remplir ce champ.";
            }

            if ($key !== "startedAt" && $key !== "duration") {
                if (!is_string($value)) {
                    $errors[$key] = "Veuillez insérer uniquement du texte.";
                } elseif (strlen($value) > 255) {
                    $errors[$key] = "Veuillez insérer 255 caractère maximum.";
                }
            } elseif ($key == "startedAt") {
                if (strtotime($value) === false) {
                    $errors[$key] = "Veuillez insérer une date valide.";
                } elseif ($value > $now) {
                    $errors[$key] = "Veuillez insérer une date futur.";
                }
            } elseif ($key == "duration") {
                if (!is_numeric($value)) {
                    $errors[$key] = "Veuillez insérer uniquement des chiffres.";
                } elseif (strlen($value) > 5) {
                    $errors[$key] = "Veuillez insérer une durée inférieur à 5 chiffres.";
                }
            }
        }



        // Get latitude & longitude from Google Apo
        if (!empty($data['location'])) {
            $httpClient = HttpClient::create();
            $responseCoords = $httpClient->request(
                'GET',
                "https://maps.googleapis.com/maps/api/geocode/json?address=" . $data['location'] . "&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU",
            );
            $coords = $responseCoords->toArray();
        }

        if (isset($coords['results']) && count($coords['results']) > 0) {
            foreach ($coords['results'] as $key) {
                $event->setLatitude($key['geometry']['location']['lat']);
                $event->setLongitude($key['geometry']['location']['lng']);
            }
        } else {
            $errors['location'] = "L'adresse que vous avez fournis n'a pas été trouvé";
        }

        if (empty($errors)) {
            $event->setType(htmlspecialchars($data['type']));
            $event->setTitle(htmlspecialchars($data['title']));
            $event->setDescription(htmlspecialchars($data['description']));
            $event->setStartedAt(new Datetime($data['startedAt']));
            $event->setDuration(htmlspecialchars($data['duration']));
            $event->setOrganisation(htmlspecialchars($data['organisation']));
            $event->setLocation(htmlspecialchars($data['location']));
            $event->addParticipant($user);

            $em = $this->getDoctrine()->getManager();
            $em->persist($event);
            $em->flush();
            return $this->json([
                'success' => "success"
            ]);
        } else {
            return $this->json([
                'errors' => $errors
            ]);
        }
    }

    /**
     * @Route("api/auth/updateEvent", name="api_auth_update_event")
     */
    public function updateEvent(Request $request, EventRepository $eventRepository)
    {
        $errors = [];

        // GET data
        $data = json_decode($request->getContent(), true);
        $now = new DateTime();

        // get Event
        $event = $eventRepository->findOneBy(
            array('id' => $data['id'])
        );

        // Retrieve User
        $user = $this->getUser();

        foreach ($data as $key => $value) {
            if (empty($value)) {
                $errors[$key] = "Veuillez remplir ce champ.";
            }

            if ($key !== "startedAt" && $key !== "duration") {
                if (!is_string($value)) {
                    $errors[$key] = "Veuillez insérer uniquement du texte.";
                } elseif (strlen($value) > 255) {
                    $errors[$key] = "Veuillez insérer 255 caractère maximum.";
                }
            } elseif ($key == "startedAt") {
                if (strtotime($value) === false) {
                    $errors[$key] = "Veuillez insérer une date valide.";
                } elseif ($value > $now) {
                    $errors[$key] = "Veuillez insérer une date futur.";
                }
            } elseif ($key == "duration") {
                if (!is_numeric($value)) {
                    $errors[$key] = "Veuillez insérer uniquement des chiffres.";
                } elseif (strlen($value) > 5) {
                    $errors[$key] = "Veuillez insérer une durée inférieur à 5 chiffres.";
                }
            }
        }

        // If errors array is empty, insert new User ||  or return errors
        if (empty($errors)) {
            $event->setType(htmlspecialchars($data['type']));
            $event->setTitle(htmlspecialchars($data['title']));
            $event->setDescription(htmlspecialchars($data['description']));
            $event->setStartedAt(new Datetime($data['startedAt']));
            $event->setDuration(htmlspecialchars($data['duration']));
            $event->setOrganisation(htmlspecialchars($data['organisation']));
            $event->setLocation(htmlspecialchars($data['location']));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->json([
                'success' => 'success'
            ]);
        } else {
            return $this->json([
                'errors' => $errors
            ]);
        }
    }
}

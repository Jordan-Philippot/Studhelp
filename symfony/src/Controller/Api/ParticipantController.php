<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use DateTime;
use App\Repository\EventRepository;



class ParticipantController extends AbstractController
{
    /**
     * @Route("api/auth/addParticipation", name="api_auth_add_participation")
     */
    public function addParticipation(Request $request, EventRepository $eventRepository)
    {
        $errors = [];

        // GET data
        $data = json_decode($request->getContent(), true);
        // Retrieve User
        $user = $this->getUser();

        // find Event
        $event = $eventRepository->findOneBy(
            array('id' => $data['eventId'])
        );

        foreach ($event->getParticipants() as $key) {
            if ($user->getId() == $key->getId()) {
                $errors['user'] = "Tu es déjà inscris à cet évènement!";
            }
        }

        if (empty($event) || !isset($event)) {
            $errors['event'] = "Désolé, aucun évènement n'as été trouvé";
        }

        // If errors array is empty, insert new User ||  or return errors
        if (empty($errors)) {
            $user->addParticipantsEvent($event);
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

    /**
     * @Route("api/auth/getParticipants", name="api_auth_get_participants")
     */
    public function getParticipants(Request $request, EventRepository $eventRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);
        // Retrieve User
        $user = $this->getUser();

        // find Event
        $event = $eventRepository->findOneBy(
            array('id' => $data['eventId'])
        );
        $participate = false;

        foreach ($event->getParticipants() as $key) {
            if ($user->getId() == $key->getId()) {
                $participate = true;
            }
        }

        return $this->json([
            'participate' => $participate
        ]);
    }

    /**
     * @Route("api/auth/getMyParticipations", name="api_auth_get_my_participations")
     */
    public function getMyParticipations()
    {
        // Retrieve User
        $user = $this->getUser();

        $em = $this->getDoctrine()->getManager();

        $now = new DateTime();
        $myParticipations = $user->getParticipantsEvents();
        $allParticipations = [];

        foreach ($myParticipations as $key) {
            if($key->getStartedAt() > $now){
                $passed = false;
            }else{
                $passed = true;
            }

            $allParticipations[] = [
                "id" => $key->getId(),
                "admin" => $key->getAdmin()->getId(),
                "type" => $key->gettype(),
                "title" => $key->getTitle(),
                "description" => $key->getDescription(),
                "startedAt" => $key->getStartedAt(),
                "duration" => $key->getDuration(),
                "organisation" => $key->getOrganisation(),
                "location" => $key->getLocation(),
                "isPassed" => $passed
            ];
        }

        return $this->json([
            'myParticipations' => $allParticipations
        ]);
    }


    /**
     * @Route("api/auth/removeParticipant", name="api_auth_remove_participant")
     */
    public function removeParticipant(Request $request, EventRepository $eventRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);
        // Retrieve User
        $user = $this->getUser();

        // find Event
        $event = $eventRepository->findOneBy(
            array('id' => $data['eventId'])
        );


        $em = $this->getDoctrine()->getManager();

        $event->removeParticipant($user);
        $em->persist($event);
        $em->flush();

        return $this->json([
            'remove' => true
        ]);
    }
}

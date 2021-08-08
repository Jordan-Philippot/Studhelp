<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\EventRepository;
use App\Repository\InvitationRepository;
use App\Repository\ConversationRepository;

use App\Entity\Invitation;
use App\Constant\StatusInvitation;

use DateTime;

class InvitationController extends AbstractController
{
    /**
     * @Route("api/auth/getAllUsers", name="api_auth_get_all_users")
     */
    public function getAllUsers(Request $request, UserRepository $userRepository, EventRepository $eventRepository, InvitationRepository $invitationRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);

        $user = $this->getUser();
        $orderBy = $data['orderBy'];
        $searchBar = $data['searchBar'];


        if ($searchBar !== '' && strlen($searchBar) > 0) {
            $allUsers = $userRepository->findBySearch($searchBar);
            dump($allUsers);
        } else {
            $allUsers = $userRepository->findAll();
        }

        $users = [];
        dump($data);



        // A verifier si id existe 
        $event = $eventRepository->findOneBy(['id' => $data['eventId']]);
        $participants = $event->getParticipants();
        $invitations = $invitationRepository->findBy(['event' => $data['eventId']]);

        $isParticipate = false;
        $isInvited = false;

        foreach ($allUsers as $keyUser) {
            foreach ($participants as $keyParticipant) {
                if ($keyUser->getId() == $keyParticipant->getId()) {
                    $isParticipate = true;
                }
            }
            foreach ($invitations as $keyInvit) {
                if ($keyInvit->getReceiver()->getId() == $keyUser->getId()) {
                    $isInvited = true;
                }
            }
            // We take all users except the admin
            if ($user->getId() !== $keyUser->getId()) {

                $users[] = [
                    'firstname' => $keyUser->getFirstname(),
                    'lastname' => $keyUser->getLastname(),
                    'email' => $keyUser->getEmail(),
                    'age' => $keyUser->getAge(),
                    'school' => $keyUser->getSchool(),
                    'city' => $keyUser->getCity(),
                    'type' => $keyUser->getType(),
                    'phone' => $keyUser->getPhone(),
                    'isParticipate' => $isParticipate,
                    'isInvited' => $isInvited,
                    "id" => $keyUser->getId(),
                ];
            }
            if (isset($orderBy) && ($orderBy == 'lastname' || $orderBy == 'email')) {
                $orderBy  = array_column($users, $orderBy);
                // Trie les données par distance ou titre croissant
                // Ajoute tableau en tant que dernier paramètre, pour trier par la clé commune
                array_multisort($orderBy, SORT_ASC, $users);
            }
            $isParticipate = false;
            $isInvited = false;
        }

        return new JsonResponse(['users' => $users]);
    }



    /**
     * @Route("api/auth/sendInvitation", name="api_auth_send_invitation")
     */
    public function sendInvitation(Request $request, UserRepository $userRepository, EventRepository $eventRepository)
    {
        $errors = [];
        // GET data
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();
        $now = new DateTime();

        $receiveUser = $userRepository->findOneBy(['id' => $data['receiveId']]);
        $event = $eventRepository->findOneBy(['id' => $data['eventId']]);

        if (empty($receiveUser)) {
            $errors['user'] = "Aucun utilisateur n'a été trouvé";
        }

        if (empty($event)) {
            $errors['event'] = "Aucun évènement n'a été trouvé";
        }

        if (!empty($data['message'])) {
            if (!is_string($data['message'])) {
                $errors['message'] = "Veuillez insérer uniquement du texte pour votre message";
            } elseif (strlen($data['message']) > 255) {
                $errors['message'] = "Veuillez insérer 255 caractères maximum";
            } else {
                $message = htmlspecialchars($data['message']);
            }
        } else {
            $message = null;
        }

        if (empty($errors)) {
            $newInvitation = new Invitation();

            $newInvitation->setSender($user);
            $newInvitation->setReceiver($receiveUser);
            $newInvitation->setEvent($event);
            $newInvitation->setSendAt($now);
            $newInvitation->setStatus(StatusInvitation::SEND);
            $newInvitation->setMessage($message);

            $em = $this->getDoctrine()->getManager();
            $em->persist($newInvitation);
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
     * @Route("api/auth/removeInvitation", name="api_auth_remove_invitation")
     */
    public function removeInvitation(Request $request, UserRepository $userRepository, EventRepository $eventRepository, InvitationRepository $invitationRepository, ConversationRepository $conversationRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $receiveUser = $userRepository->findOneBy(['id' => $data['receiveId']]);
        if (isset($data['senderId'])) {
            $senderUser = $userRepository->findOneBy(['id' => $data['senderId']]);
        } else {
            $senderUser = $user;
        }


        $event = $eventRepository->findOneBy(['id' => $data['eventId']]);

        $conversation = $conversationRepository->findOneBy(['event' => $event]);
        $conversation->removeUsers($user);

        $invitation = $invitationRepository->findOneBy(['event' => $event, 'receiver' => $receiveUser, 'sender' => $senderUser]);

        $em = $this->getDoctrine()->getManager();
        $em->remove($invitation);
        $em->persist($conversation);

        $em->flush();
        return $this->json([
            'success' => "success"
        ]);
    }

    /**
     * @Route("api/auth/acceptInvitation", name="api_auth_accept_invitation")
     */
    public function acceptInvitation(Request $request, UserRepository $userRepository, EventRepository $eventRepository, InvitationRepository $invitationRepository, ConversationRepository $conversationRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $receiverUser = $userRepository->findOneBy(['id' => $data['receiveId']]);
        $senderUser = $userRepository->findOneBy(['id' => $data['senderId']]);

        $event = $eventRepository->findOneBy(['id' => $data['eventId']]);

        $invitation = $invitationRepository->findOneBy(['event' => $event, 'receiver' => $receiverUser, 'sender' => $senderUser]);

        $conversation = $conversationRepository->findOneBy(['event' => $event]);
        $conversation->addUsers($user);

        $invitation->setStatus(StatusInvitation::ACCEPTED);
        $em = $this->getDoctrine()->getManager();
        $user->addParticipantsEvent($event);
        $em->persist($invitation);
        $em->persist($user);
        $em->persist($conversation);
        $em->flush();

        return $this->json([
            'success' => "success"
        ]);
    }

    /**
     * @Route("api/auth/getMyInvitations", name="api_auth_get_my_invitations")
     */
    public function getMyInvitations(InvitationRepository $invitationRepository)
    {
        $user = $this->getUser();
        $now = new DateTime();

        $receiver = $user->getReceiverInvitations();
        $sender = $user->getSenderInvitations();

        dump($receiver, $sender);
        $allReceiver = [];
        $allSender = [];


        foreach ($receiver as $key) {

            if ($now > $key->getEvent()->getStartedAt()) {
                $isPassed = true;
            } else {
                $isPassed = false;
            }
            $invitation = $invitationRepository->findOneBy(["event" => $key->getEvent(), "receiver" => $key->getReceiver(), "sender" => $key->getSender()]);

            if ($invitation->getStatus() !== "refused") {
                // get invitation where event id and receiverid is receiver and senderid is sender
                $allReceiver[] = [
                    "receiver" => [
                        "email" => $key->getReceiver()->getEmail(),
                        "firstname" => $key->getReceiver()->getFirstname(),
                        "lastname" => $key->getReceiver()->getLastname(),
                        "school" => $key->getReceiver()->getSchool(),
                        "id" => $key->getReceiver()->getId(),
                    ],
                    "sender" => [
                        "email" => $key->getSender()->getEmail(),
                        "firstname" => $key->getSender()->getFirstname(),
                        "lastname" => $key->getSender()->getLastname(),
                        "school" => $key->getSender()->getSchool(),
                        "id" => $key->getSender()->getId(),
                    ],
                    "event" => [
                        "id" =>  $key->getEvent()->getId(),
                        "title" => $key->getEvent()->getTitle(),
                        "description" => $key->getEvent()->getDescription(),
                        "startedAt" => $key->getEvent()->getStartedAt(),
                        "duration" => $key->getEvent()->getDuration(),
                        "organisation" => $key->getEvent()->getOrganisation(),
                        "location" => $key->getEvent()->getLocation(),
                        "latitude" => $key->getEvent()->getLatitude(),
                        "longitude" => $key->getEvent()->getLongitude(),
                        "type" => $key->getEvent()->getType(),
                        "admin" => $key->getEvent()->getAdmin()->getEmail(),
                        "isPassed" => $isPassed,
                    ],
                    "invitation" => [
                        "status" => $invitation->getStatus(),
                    ],
                    "currentUser" => $user->getId(),
                ];
            }
        }
        foreach ($sender as $key) {

            if ($now > $key->getEvent()->getStartedAt()) {
                $isPassed = true;
            } else {
                $isPassed = false;
            }
            $invitation = $invitationRepository->findOneBy(["event" => $key->getEvent(), "receiver" => $key->getReceiver(), "sender" => $key->getSender()]);

            if ($invitation->getStatus() !== "refused") {
                $allSender[] = [
                    "sender" => [
                        "email" => $key->getSender()->getEmail(),
                        "firstname" => $key->getSender()->getFirstname(),
                        "lastname" => $key->getSender()->getLastname(),
                        "school" => $key->getSender()->getSchool(),
                        "id" => $key->getSender()->getId(),
                    ],
                    "receiver" => [
                        "email" => $key->getReceiver()->getEmail(),
                        "firstname" => $key->getReceiver()->getFirstname(),
                        "lastname" => $key->getReceiver()->getLastname(),
                        "school" => $key->getReceiver()->getSchool(),
                        "id" => $key->getReceiver()->getId(),
                    ],
                    "event" => [
                        "id" =>  $key->getEvent()->getId(),
                        "title" => $key->getEvent()->getTitle(),
                        "description" => $key->getEvent()->getDescription(),
                        "startedAt" => $key->getEvent()->getStartedAt(),
                        "duration" => $key->getEvent()->getDuration(),
                        "organisation" => $key->getEvent()->getOrganisation(),
                        "location" => $key->getEvent()->getLocation(),
                        "latitude" => $key->getEvent()->getLatitude(),
                        "longitude" => $key->getEvent()->getLongitude(),
                        "type" => $key->getEvent()->getType(),
                        "admin" => $key->getEvent()->getAdmin()->getEmail(),
                        "isPassed" => $isPassed,
                    ],
                    "invitation" => [
                        "status" => $invitation->getStatus(),
                    ],
                    "currentUser" => $user->getId(),
                ];
            }
        }


        return $this->json([
            'receiver' => $allReceiver,
            'sender' => $allSender
        ]);
    }
}

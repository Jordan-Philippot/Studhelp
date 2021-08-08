<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Conversation;

use App\Repository\ConversationRepository;
use Datetime;

class ConversationController extends AbstractController
{
    /**
     * @Route("/api/auth/conversation/{id}", name="api_auth_get_conversation")
     */
    public function getConversation(ConversationRepository $conversationRepository, $id)
    {
        $user = $this->getUser();

        $id = intval($id);
        $conversation = $conversationRepository->findOneBy(['id' => $id]);

        $association = [];
        $messages = [];
        $users = [];
        $numberOfParticipants = 0;

        if ($conversation == null) {
            $thisConversation = null;
        } else {

            if ($conversation->getAssociation() !== null) {
                $association = [
                    "id" => $conversation->getAssociation()->getId(),
                    "idAssociation" => $conversation->getAssociation()->getIdAssociation(),
                    "siret" => $conversation->getAssociation()->getSiret(),
                    "dateCreation" => $conversation->getAssociation()->getDateCreation(),
                    "dateLastDeclaration" => $conversation->getAssociation()->getDateDerniereDeclaration(),
                    "title" => $conversation->getAssociation()->getTitre(),
                    "titleShort" => $conversation->getAssociation()->getTitreCourt(),
                    "description" => $conversation->getAssociation()->getDescription(),
                    "addressSiege" => $conversation->getAssociation()->getAdresseSiege(),
                    "website" => $conversation->getAssociation()->getSiteWeb(),
                    "createdAt" => $conversation->getAssociation()->getCreatedAt(),
                    "latitude" => $conversation->getAssociation()->getLatitude(),
                    "longitude" => $conversation->getAssociation()->getLongitude()
                ];
            }
            if ($conversation->getMessages() !== null) {
                foreach ($conversation->getMessages() as $key) {
                    if ($key->getSender()->getId() === $user->getId()) {
                        $iamSender = true;
                    } else {
                        $iamSender = false;
                    }
                    $messages[] = [
                        "sender" => [
                            "id" => $key->getSender()->getId(),
                            "firstname" => $key->getSender()->getFirstname(),
                            "lastname" => $key->getSender()->getLastname(),
                            "email" => $key->getSender()->getEmail(),
                            "age" => $key->getSender()->getAge(),
                            "school" => $key->getSender()->getSchool(),
                            "city" => $key->getSender()->getCity(),
                            "type" => $key->getSender()->getType(),
                        ],
                        "message" => $key->getMessage(),
                        "sendAt" => $key->getSendAt(),
                        "id" => $key->getId(),
                        "iamSender" => $iamSender,
                    ];
                }
            }
            if ($conversation->getUsers() !== null) {
                $numberOfParticipants = count($conversation->getUsers());
                foreach ($conversation->getUsers() as $key) {
                    $users[] = [
                        "id" => $key->getId(),
                        "firstname" => $key->getFirstname(),
                        "lastname" => $key->getLastname(),
                        "email" => $key->getEmail(),
                        "age" => $key->getAge(),
                        "school" => $key->getSchool(),
                        "city" => $key->getCity(),
                        "type" => $key->getType(),
                    ];
                }
            }

            $thisConversation = [
                "id" => $conversation->getId(),
                "messages" => $messages,
                "association" => $association,
                "users" => $users,

                "status" => $conversation->getStatus(),
                "createdAt" => $conversation->getCreatedAt(),

                "numberOfParticipants" => $numberOfParticipants,
                "event" => [
                    "id" => $conversation->getEvent()->getId(),
                    "admin" => $conversation->getEvent()->getAdmin(),
                    "type" => $conversation->getEvent()->getType(),
                    "title" => $conversation->getEvent()->getTitle(),
                    "description" => $conversation->getEvent()->getDescription(),
                    "startedAt" => $conversation->getEvent()->getStartedAt(),
                    "duration" => $conversation->getEvent()->getDuration(),
                    "organisation" => $conversation->getEvent()->getOrganisation(),
                    "location" => $conversation->getEvent()->getLocation(),
                    "latitude" => $conversation->getEvent()->getlatitude(),
                    "longitude" => $conversation->getEvent()->getLongitude(),
                ],
            ];
        }

        return new JsonResponse([
            'conversation' => $thisConversation
        ]);
    }



    /** 
     * @Route("/api/auth/conversationsByUser", name="api_auth_conversations_by_user")
     */
    public function getConversationsByUser(ConversationRepository $conversationRepository)
    {
        $user = $this->getUser();
        $usersConversations = $user->getConversations();
        // dump($usersConversations);
        $conversations = [];
        $association = [];
        $messages = [];
        $users = [];
        $numberOfParticipants = 0;

        if ($usersConversations !== null) {
            foreach ($usersConversations as $conversation) {

                // Association
                if ($conversation->getAssociation() !== null) {
                    $association = [
                        "id" => $conversation->getAssociation()->getId(),
                        "idAssociation" => $conversation->getAssociation()->getIdAssociation(),
                        "siret" => $conversation->getAssociation()->getSiret(),
                        "dateCreation" => $conversation->getAssociation()->getDateCreation(),
                        "dateLastDeclaration" => $conversation->getAssociation()->getDateDerniereDeclaration(),
                        "title" => $conversation->getAssociation()->getTitre(),
                        "titleShort" => $conversation->getAssociation()->getTitreCourt(),
                        "description" => $conversation->getAssociation()->getDescription(),
                        "addressSiege" => $conversation->getAssociation()->getAdresseSiege(),
                        "website" => $conversation->getAssociation()->getSiteWeb(),
                        "createdAt" => $conversation->getAssociation()->getCreatedAt(),
                        "latitude" => $conversation->getAssociation()->getLatitude(),
                        "longitude" => $conversation->getAssociation()->getLongitude()
                    ];
                }
                if ($conversation->getMessages() !== null) {
                    foreach ($conversation->getMessages() as $key) {
                        $messages[] = [
                            "sender" => [
                                "id" => $key->getSender()->getId(),
                                "firstname" => $key->getSender()->getFirstname(),
                                "lastname" => $key->getSender()->getLastname(),
                                "email" => $key->getSender()->getEmail(),
                                "age" => $key->getSender()->getAge(),
                                "school" => $key->getSender()->getSchool(),
                                "city" => $key->getSender()->getCity(),
                                "type" => $key->getSender()->getType(),
                            ],
                            "message" => $key->getMessage(),
                            "sendAt" => $key->getSendAt(),
                        ];
                    }
                }
                if ($conversation->getUsers() !== null) {
                    $numberOfParticipants = count($conversation->getUsers());
                    foreach ($conversation->getUsers() as $key) {
                        $users[] = [
                            "id" => $key->getId(),
                            "firstname" => $key->getFirstname(),
                            "lastname" => $key->getLastname(),
                            "email" => $key->getEmail(),
                            "age" => $key->getAge(),
                            "school" => $key->getSchool(),
                            "city" => $key->getCity(),
                            "type" => $key->getType(),
                        ];
                    }
                }

                if (strlen($conversation->getEvent()->getDescription()) > 50) {
                    $summary = substr($conversation->getEvent()->getDescription(), 0, 50) . "...";
                } else {
                    $summary = $conversation->getEvent()->getDescription();
                }


                $conversations[] = [
                    "id" => $conversation->getId(),
                    "messages" => $messages,
                    "association" => $association,
                    "users" => $users,

                    "status" => $conversation->getStatus(),
                    "createdAt" => $conversation->getCreatedAt(),

                    "numberOfParticipants" => $numberOfParticipants,
                    "event" => [
                        "id" => $conversation->getEvent()->getId(),
                        "admin" => $conversation->getEvent()->getAdmin(),
                        "type" => $conversation->getEvent()->getType(),
                        "title" => $conversation->getEvent()->getTitle(),
                        "description" => $conversation->getEvent()->getDescription(),
                        "startedAt" => $conversation->getEvent()->getStartedAt(),
                        "duration" => $conversation->getEvent()->getDuration(),
                        "organisation" => $conversation->getEvent()->getOrganisation(),
                        "location" => $conversation->getEvent()->getLocation(),
                        "latitude" => $conversation->getEvent()->getlatitude(),
                        "longitude" => $conversation->getEvent()->getLongitude(),
                        "summary" => $summary,
                    ],
                ];
            }
        }

        return new JsonResponse([
            'conversations' => $conversations
        ]);
    }



    /**
     * @Route("/api/auth/conversation/post", name="api_auth_post_conversation")
     */
    public function postConversation(Request $request, ConversationRepository $conversationRepository)
    {
        $errors = [];

        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $conversation = new Conversation;

        dump($data);
        foreach ($data as $key => $value) {
            if (empty($value)) {
                $errors[$key] = "Veuillez remplir ce champ.";
            }
        }

        if (!empty($data['user'])) {
            $id = $data['user'];
        } else {
            $errors['user'] = 'Veuillez indiquer un utilisateur.';
        }

        if (empty($errors)) {
            // $conversation->setUsers([$user->getId(), $id]);
            // $conversation->setSendAt(new DateTime());

            $em = $this->getDoctrine()->getManager();
            $em->persist($conversation);
            $em->flush();
            return new JsonResponse([
                'success' => 'success'
            ]);
        }
        return new JsonResponse([
            'errors' => $errors
        ]);
    }
}

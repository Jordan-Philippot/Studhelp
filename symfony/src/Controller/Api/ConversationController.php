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
        $id = intval($id);
        $conversationEntity = $conversationRepository->findOneBy(['id' => $id]);

        if ($conversationEntity == null) {
            $conversation = null;
        } else {
            $conversation = [
                "id" => $conversationEntity->getId(),
                "event" => $conversationEntity->getEvent(),
                "messages" => $conversationEntity->getMessages(),
                "association" => $conversationEntity->getAssociation(),
                "users" => $conversationEntity->getUsers(),
                "status" => $conversationEntity->getStatus(),
                "createdAt" => $conversationEntity->getCreatedAt(),
            ];
        }

        return new JsonResponse([
            'conversation' => $conversation
        ]);
    }



    /** 
     * @Route("/api/auth/conversationsByUser", name="api_auth_conversations_by_user")
     */
    public function getConversationsByUser(ConversationRepository $conversationRepository)
    {
        $user = $this->getUser();
        $usersConversations = $user->getConversations();
        // $usersConversations = $conversationRepository->findBy(['users' => $user->getId()]);
        dump($usersConversations);
        $conversations = [];
        if ($usersConversations !== null) {
            foreach ($usersConversations as $conversation) {
                dump($conversation);
                $conversations[] = [
                    "id" => $conversation->getId(),
                    "event" => $conversation->getEvent(),
                    "messages" => $conversation->getMessages(),
                    "association" => $conversation->getAssociation(),
                    "users" => $conversation->getUsers(),
                    "status" => $conversation->getStatus(),
                    "createdAt" => $conversation->getCreatedAt(),
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

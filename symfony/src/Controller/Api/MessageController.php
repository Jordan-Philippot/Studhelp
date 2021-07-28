<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Message;

use App\Repository\MessageRepository;
use App\Repository\ConversationRepository;
use Datetime;

class MessageController extends AbstractController
{
    /**
     * @Route("/api/messages/{conversation_id}", name="get_conversation_message")
     */
    public function getMessages(MessageRepository $messageRepository, $conversation_id)
    {
        $messageEntity = $messageRepository->findBy(["conversation" => $conversation_id]);
        $messages = [];
        if ($messageEntity == null)
            $messages = null;
        else {
            foreach ($messageEntity as $message) {
                $messages[] = [
                    'message' => $message->getMessage(),
                    'sender' => $message->getSender(),
                    'send_at' => $date_format($message->getSendAt(), 'Y-m-d')
                ];
            }
        }
        return new JsonResponse([
            'messages' => $messages
        ]);
    }

    /**
     * @Route("/api/messages/{conversation_id}/post", name="get_conversation_message")
     */
    public function sendMessage(Request $request, ConversationRepository $conversationRepository, $conversation_id)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        $message = new Message;
        
        dump($data);
        foreach ($data as $key => $value) {
            if (empty($value)) {
                $errors[$key] = "Veuillez remplir ce champ.";
            }
        }
        if (!empty(htmlspecialchars(trim($data['message'])))) {
            $content = htmlspecialchars(trim($data['message']));
            if (strlen($content) > 2000)
                $errors['message'] = 'Le message est trop long';
        }
        else {
            $errors['message'] = 'Le message est vide';
        }
        if (empty($errors)) {
            $message->setMessage($content);
            $message->setSender($user->getId());
            $message->setSendAt(new DateTime());

            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
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

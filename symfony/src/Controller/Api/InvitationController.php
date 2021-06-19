<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\EventRepository;

class InvitationController extends AbstractController
{
    /**
     * @Route("api/auth/getAllUsers", name="api_auth_get_all_users")
     */
    public function getAllUsers(Request $request, UserRepository $userRepository, EventRepository $eventRepository)
    {
        // GET data
        $data = json_decode($request->getContent(), true);

        $user = $this->getUser();

        $allUsers = $userRepository->findAll();
        $users = [];

        // A verifier si id existe 
        $event = $eventRepository->findOneBy(['id' => $data['eventId']]);
        $participants = $event->getParticipants();

        $isInvited = false;

        foreach ($allUsers as $keyUser) {
            foreach ($participants as $keyParticipant) {
                if ($keyUser->getId() == $keyParticipant->getId()) {
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
                    'isInvited' => $isInvited
                ];
            }
        }

        return new JsonResponse(['users' => $users]);
    }
}

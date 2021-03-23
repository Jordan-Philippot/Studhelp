<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Repository\UserRepository;
use App\Entity\User;
use Google_Client;

class GoogleAuthController extends AbstractController
{
     /**
     * @Route("api/googleAuth", name="api_google_auth")
     */
    public function googleAuth(Request $request, JWTTokenManagerInterface $JWTManager, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['tokenId'])) {
            $tokenId = $data['tokenId'];
            $client = new Google_Client(['client_id' => "534386804784-eqjhmmep5fmm96hovnn5kp8h6e2g5f6f.apps.googleusercontent.com"]);  // Specify the CLIENT_ID of the app that accesses the backend
            $payload = $client->verifyIdToken($tokenId);
            if (isset($payload)) {
                // $userid = $payload['sub'];
                $email = $payload['email'];
                $firstname = $payload['given_name'];
                $lastname = $payload['family_name'];
                $checked = $payload['email_verified'];

                // If email gmail exist, we check if password is null (gmail account haven't password) and if gmail address is checked by google 
                $user = $userRepository->findOneBy(['email' => $email]);
                // is_null($user->getPassword()
                if (isset($user) && $checked == true) {
                    // If Success, we can logged user
                    return $this->json(['token' => $JWTManager->create($user)]);
                } else {
                    $newUser = new User();
                    $newUser->setEmail($email);
                    $newUser->setFirstname($firstname);
                    $newUser->setLastname($lastname);
                    $newUser->setRoles(["ROLE_USER"]);
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($newUser);
                    $em->flush();
                    return $this->json(['token' => $JWTManager->create($newUser)]);
                    // je l'inscrit , champ Google id ou autre ?
                }
            } else {
                return $this->json(['errors' => "Votre compte google n'as pas les autorisations requises"]);
                // Invalid ID token
            }
        } else {
            return $this->json(['errors' => "Votre compte google n'as pas les autorisations requises"]);
        }
    }
}

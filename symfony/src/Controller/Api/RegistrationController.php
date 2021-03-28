<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use DateTime;
use App\Repository\UserRepository;
use App\Entity\User;
class RegistrationController extends AbstractController
{
    /**
     * @Route("api/register", name="api_register_user")
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository)
    {
        $errors = [];

        // get data
        $data = json_decode($request->getContent(), true);
      
        $password = $data['password'];
        $email = $data['email'];
        $type = $data['type'];
        $agree = $data['agree'];

        foreach ($data as $key => $value) {
            if (empty($value) || !$value) {
                $errors[$key] = 'Veuillez remplir ce champs';
            }
        }
        // Agree terms
        if (!$agree || empty($agree) || $agree != true) {
            $errors['agree'] = "Veuillez remplir ce champss";
        }

        // Check double email
        $checkEmail = $userRepository->findOneBy(
            array('email' => $email),
            array('id' => 'DESC')
        );

        // Create new User and check data
        $user = new User();

        if ($checkEmail) {
            $errors['email'] = "Email déjà existant";
        } elseif (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Veuillez renseigner un Email valide";
        }

        $user->setRoles(["ROLE_USER"]);

        // If errors array is empty, set Informations & insert new User || or return errors
        if (empty($errors)) {
            $user->setPassword($encoder->encodePassword($user, $password));
            $user->setEmail(htmlspecialchars($email));
            $user->setType(htmlspecialchars($type));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->json([
                'User' => $user->getEmail()
            ]);
        } else {
            return $this->json([
                'errors' => $errors
            ]);
        }
    }
}

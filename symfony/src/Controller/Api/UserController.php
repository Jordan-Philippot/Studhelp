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

class UserController extends AbstractController
{
    /**
     * @Route("api/auth/user", name="api_auth_user")
     */
    public function user()
    {
        $user = $this->getUser();

        return new JsonResponse(['user' => $user->getEmail()]);
    }

    /**
     * @Route("api/auth/profile", name="api_auth_profile")
     */
    public function getProfile()
    {
        $user = $this->getUser();
        // List informations about Profile User
        $profile = [
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'email' => $user->getEmail(),
            'age' => $user->getAge(),
            'school' => $user->getSchool(),
            'city' => $user->getCity(),
            'type' => $user->getType(),
            'phone' => $user->getPhone()
        ];

        return new JsonResponse(['profile' => $profile]);
    }

    /**
     * @Route("api/auth/setprofile", name="api_auth_set_profile")
     */
    public function setProfile(Request $request, UserPasswordEncoderInterface $encoder,  UserRepository $userRepository)
    {
        $errors = [];

        // GET data
        $data = json_decode($request->getContent(), true);

        $email = $data['email'];
        $password = $data['password'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $type = $data['type'];
        $phone = $data['phone'];
        $age = $data['age'];
        $school = $data['school'];


        // Check double email
        $checkEmail = $userRepository->findOneBy(
            array('email' => $email),
            array('id' => 'DESC')
        );

        if ($checkEmail) {
            $thismail = $checkEmail->getEmail();
        } else {
            $changeEmail = true;
        }

        // Retrieve User
        $user = $this->getUser();

        if (strlen($password) > 0 && strlen($password) < 5) {
            $errors['password'] = "Votre nouveau mot de passe doit comporter au moins 5 caractère";
        } elseif (!empty($password) && $password) {
            $user->setPassword($encoder->encodePassword($user, $password));
        }

        if (isset($thismail)) {
            if ($thismail !== $user->getEmail()) {
                $errors['email'] = "Email déjà existant";
            }
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Veuillez renseigner un Email valide";
        } elseif (empty($email) || !$email) {
            $errors['email'] = "Veuillez renseigner un Email";
        } else {
            $user->setEmail(htmlspecialchars($email));
        }

        if (!is_string($firstname)) {
            $errors['firstname'] = "Veuillez renseigner un prénom valide";
        } elseif (empty($firstname) || !$firstname) {
            $errors['firstname'] = "Veuillez renseigner votre Prénom";
        } else {
            $user->setFirstname(htmlspecialchars($firstname));
        }

        if (!is_string($lastname)) {
            $errors['lastname'] = "Veuillez renseigner un nom valide";
        } elseif (empty($lastname) || !$lastname) {
            $errors['lastname'] = "Veuillez renseigner votre Nom";
        } else {
            $user->setLastname(htmlspecialchars($lastname));
        }

        if (!is_string($type)) {
            $errors['type'] = "Veuillez renseigner un type valide";
        } elseif (empty($type) || !$type) {
            $errors['type'] = "Veuillez renseigner votre type";
        } else {
            $user->setType(htmlspecialchars($type));
        }

        if (!is_string($school)) {
            $errors['school'] = "Veuillez renseigner une organisation valide";
        } elseif (empty($school) || !$school) {
            $errors['school'] = "Veuillez renseigner votre organisation";
        } else {
            $user->setSchool(htmlspecialchars($school));
        }

        if (!is_numeric($phone)) {
            $errors['phone'] = "Veuillez renseigner un numéro valide";
        } elseif (empty($phone) || !$phone) {
            $errors['phone'] = "Veuillez renseigner votre numéro";
        } else {
            $user->setPhone(htmlspecialchars($phone));
        }

        if (!is_numeric($age)) {
            $errors['age'] = "Veuillez renseigner un age valide";
        } elseif (empty($age) || !$age) {
            $errors['age'] = "Veuillez renseigner votre age";
        } else {
            $user->setAge(htmlspecialchars($age));
        }

        // If errors array is empty, insert new User ||  or return errors
        if (empty($errors)) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            if (isset($changeEmail) && $changeEmail) {
                return $this->json([
                    'profile' => 'success',
                    'email' => 'change'
                ]);
            } else {
                return $this->json([
                    'profile' => 'success'
                ]);
            }
        } else {
            return $this->json([
                'errors' => $errors
            ]);
        }
    }
}

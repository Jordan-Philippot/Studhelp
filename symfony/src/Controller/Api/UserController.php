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
     * @Route("api/register", name="api_register_user")
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository)
    {
        $errors = [];

        // GET data
        $data = json_decode($request->getContent(), true);

        $email = $data['email'];
        $password = $data['password'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $city = $data['city'];
        $school = $data['school'];
        $type = $data['type'];
        $phone = $data['phone'];
        $age = $data['age'];

        // Agree terms
        // if (!$data['agree'] || empty($data['agree'] || $data['agree'] != true)) {
        //     $errors['agree'] = "Veuillez indiquer que vous avez lu et accepté les conditions générales";
        // }

        // Check double email
        $checkEmail = $userRepository->findOneBy(
            array('email' => $email),
            array('id' => 'DESC')
        );

        // Create new User and check data
        $user = new User();

        if (empty($password) || !$password) {
            $errors['password'] = "Veuillez renseigner un mot de passe";
        } else {
            $user->setPassword($encoder->encodePassword($user, $password));
        }

        if ($checkEmail) {
            $errors['email'] = "Email déjà existant";
        } elseif (!preg_match('/^[\w\-.]+@([\w-]+\.)+[\w-]{2,6}$/', $email)) {
            $errors['email'] = "Veuillez renseigner un Email valide";
        } elseif (empty($email) || !$email) {
            $errors['email'] = "Veuillez renseigner un Email";
        } else {
            $user->setEmail(htmlspecialchars($email));
        }

        if (!preg_match('/^[A-Za-z]+[ \-\']?[[A-Za-z]+[ \-\']?]*[A-Za-z]+$/', $firstname)) {
            $errors['firstname'] = "Veuillez renseigner un prénom valide";
        } elseif (empty($firstname) || !$firstname) {
            $errors['firstname'] = "Veuillez renseigner votre Prénom";
        } else {
            $user->setFirstname(htmlspecialchars($firstname));
        }

        if (!preg_match('/^[A-Za-z]+[ \-\']?[[A-Za-z]+[ \-\']?]*[A-Za-z]+$/', $lastname)) {
            $errors['lastname'] = "Veuillez renseigner un nom valide";
        } elseif (empty($lastname) || !$lastname) {
            $errors['lastname'] = "Veuillez renseigner votre Nom";
        } else {
            $user->setLastname(htmlspecialchars($lastname));
        }

        if (empty($city) || !$city) {
            $errors['city'] = "Veuillez renseigner votre ville";
        } else {
            $user->setCity($city);
        }

        if (empty($school) || !$school) {
            $errors['school'] = "Veuillez renseigner votre établissement scolaire ou le nom de votre association";
        } else {
            $user->setSchool($school);
        }

        if (empty($type) || !$type) {
            $errors['type'] = "Veuillez préciser si vous êtes étudiant ou une association";
        } else {
            $user->setType($type);
        }

        if (empty($phone) || !$phone) {
            $errors['phone'] = "Veuillez renseigner votre N° de téléphone";
        } else {
            $user->setPhone($phone);
        }

        if (empty($age) || !$age) {
            $errors['age'] = "Veuillez renseigner votre âge";
        } else {
            $user->setAge($age);
        }

        $user->setRoles(["ROLE_USER"]);
        // If errors array is empty, insert new User
        // or return errors
        if (empty($errors)) {
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

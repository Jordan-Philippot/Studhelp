<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventController extends AbstractController
{
    /**
     * @Route("/event", name="event")
     */
    public function index(): Response
    {
        $client = new \GuzzleHttp\Client(['base_uri' => 'https://entreprise.data.gouv.fr/']);
        // Send a request to http://my.api.url/site/67/module/1449/item
        $response = $client->request('GET', 'api/rna/v1/full_text/étudiant');
        dump($response);
        return new JsonResponse($response);
        // return $this->render('event/index.html.twig', [
        //     'controller_name' => 'EventController',
        // ]);
    }
}

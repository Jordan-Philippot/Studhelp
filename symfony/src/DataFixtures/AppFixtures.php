<?php

namespace App\DataFixtures;

use App\Entity\Event;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        
        $faker = Faker\Factory::create('fr_FR');
        // on crée 30 events avec data "aléatoires" en français
        $events = array();
        for ($i = 0; $i < 30; $i++) {
            $events[$i] = new Event();
            $events[$i]->setType("Soutien scolaire");
            $events[$i]->setTitle("Travail de groupe à Epitech");
            $events[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $events[$i]->setStartedAt($faker->dateTime($max = 'now', $timezone = null));
            $events[$i]->setDuration($faker->numberBetween($min = 10, $max = 1260));
            $events[$i]->setOrganisation("Epitech");
            $events[$i]->setLocation($faker->address);
            $events[$i]->setLatitude($faker->latitude($min = -90, $max = 90));
            $events[$i]->setLongitude($faker->longitude($min = -180, $max = 180));
            // $events[$i]->setAdmin(1);

            $manager->persist($events[$i]);
        }

        $manager->flush();
    }
}

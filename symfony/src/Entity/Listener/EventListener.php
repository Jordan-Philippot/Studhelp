<?php

namespace App\Entity\Listener;

use App\Entity\Event;
use App\Entity\Conversation;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\EntityManagerInterface;

use Datetime;
use App\Constant\StatusConversation;

class EventListener
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function newEvent(Event $myEvent, LifecycleEventArgs $event)
    {
        // Listening changes
        $uow = $event->getEntityManager()->getUnitOfWork();
        $changes = $uow->getEntityChangeSet($myEvent);

        $user = $myEvent->getAdmin();
        $now = new DateTime();

        $newConversation = new Conversation();
        $newConversation->setEvent($myEvent);
        $newConversation->setCreatedAt($now);
        $newConversation->setStatus(StatusConversation::ACTIVE);
        $newConversation->addUsers($user);

        $this->em->persist($newConversation);
        $this->em->flush();

    }

    // public function postUpdate(User $user, LifecycleEventArgs $event)
    // {
    //     $this->changes($user, $event);
    // }

    public function postPersist(Event $myEvent, LifecycleEventArgs $event)
    {
        // $this->changes($user, $event);
        $this->newEvent($myEvent, $event);
    }
}

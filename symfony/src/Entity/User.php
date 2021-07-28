<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", nullable=true)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=5, nullable=true, nullable=true)
     */
    private $age;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $school;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $phone;

    /**
     * @ORM\OneToMany(targetEntity=Event::class, mappedBy="admin", orphanRemoval=true)
     */
    private $admin_events;

    /**
     * @ORM\ManyToMany(targetEntity=Event::class, mappedBy="participants")
     */
    private $participants_events;

    /**
     * @ORM\OneToMany(targetEntity=Invitation::class, mappedBy="sender", orphanRemoval=true)
     */
    private $sender_invitations;

    /**
     * @ORM\OneToMany(targetEntity=Invitation::class, mappedBy="receiver", orphanRemoval=true)
     */
    private $receiver_invitations;

    /**
     * @ORM\OneToMany(targetEntity=Conversation::class, mappedBy="sender")
     */
    private $conversations;

    /**
     * @ORM\ManyToMany(targetEntity=Conversation::class, mappedBy="user1")
     */
    private $conversation;


    public function __construct()
    {
        $this->admin_events = new ArrayCollection();
        $this->participants_events = new ArrayCollection();
        $this->sender_invitations = new ArrayCollection();
        $this->receiver_invitations = new ArrayCollection();
        $this->conversations = new ArrayCollection();
        $this->conversation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getAge(): ?string
    {
        return $this->age;
    }

    public function setAge(string $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getSchool(): ?string
    {
        return $this->school;
    }

    public function setSchool(string $school): self
    {
        $this->school = $school;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getAdminEvents(): Collection
    {
        return $this->admin_events;
    }

    public function addAdminEvent(Event $adminEvent): self
    {
        if (!$this->admin_events->contains($adminEvent)) {
            $this->admin_events[] = $adminEvent;
            $adminEvent->setAdmin($this);
        }

        return $this;
    }

    public function removeAdminEvent(Event $adminEvent): self
    {
        if ($this->admin_events->removeElement($adminEvent)) {
            // set the owning side to null (unless already changed)
            if ($adminEvent->getAdmin() === $this) {
                $adminEvent->setAdmin(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getParticipantsEvents(): Collection
    {
        return $this->participants_events;
    }

    public function addParticipantsEvent(Event $participantsEvent): self
    {
        if (!$this->participants_events->contains($participantsEvent)) {
            $this->participants_events[] = $participantsEvent;
            $participantsEvent->addParticipant($this);
        }

        return $this;
    }

    public function removeParticipantsEvent(Event $participantsEvent): self
    {
        if ($this->participants_events->removeElement($participantsEvent)) {
            $participantsEvent->removeParticipant($this);
        }

        return $this;
    }

    /**
     * @return Collection|Invitation[]
     */
    public function getSenderInvitations(): Collection
    {
        return $this->sender_invitations;
    }

    public function addSenderInvitation(Invitation $senderInvitation): self
    {
        if (!$this->sender_invitations->contains($senderInvitation)) {
            $this->sender_invitations[] = $senderInvitation;
            $senderInvitation->setSender($this);
        }

        return $this;
    }

    public function removeSenderInvitation(Invitation $senderInvitation): self
    {
        if ($this->sender_invitations->removeElement($senderInvitation)) {
            // set the owning side to null (unless already changed)
            if ($senderInvitation->getSender() === $this) {
                $senderInvitation->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Invitation[]
     */
    public function getReceiverInvitations(): Collection
    {
        return $this->receiver_invitations;
    }

    public function addReceiverInvitation(Invitation $receiverInvitation): self
    {
        if (!$this->receiver_invitations->contains($receiverInvitation)) {
            $this->receiver_invitations[] = $receiverInvitation;
            $receiverInvitation->setReceiver($this);
        }

        return $this;
    }

    public function removeReceiverInvitation(Invitation $receiverInvitation): self
    {
        if ($this->receiver_invitations->removeElement($receiverInvitation)) {
            // set the owning side to null (unless already changed)
            if ($receiverInvitation->getReceiver() === $this) {
                $receiverInvitation->setReceiver(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Conversation[]
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): self
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations[] = $conversation;
            $conversation->setSender($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): self
    {
        if ($this->conversations->removeElement($conversation)) {
            // set the owning side to null (unless already changed)
            if ($conversation->getSender() === $this) {
                $conversation->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Conversation[]
     */
    public function getConversation(): Collection
    {
        return $this->conversation;
    }

}

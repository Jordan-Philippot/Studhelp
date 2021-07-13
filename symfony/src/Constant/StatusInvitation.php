<?php

namespace App\Constant;

class StatusInvitation
{
    const SEND = "send";
    const ACCEPTED = "accepted";
    const REFUSED = "refused";

    public static function list(){
        return [self::SEND, self::ACCEPTED, self::REFUSED];
    }
}
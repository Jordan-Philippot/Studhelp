<?php

namespace App\Constant;

class StatusConversation
{
    const ACTIVE = "active";
    const CANCELED = "canceled";
    const INACTIVE = "inactive";

    public static function list(){
        return [self::ACTIVE, self::CANCELED, self::INACTIVE];
    }
}
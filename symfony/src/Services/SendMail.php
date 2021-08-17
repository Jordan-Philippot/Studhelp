<?php

// namespace App\Service;

// use Error;

// class SendMail
// {

//     public function send($sendTo, $subject, $template, $templateName, $parameters)
//     {
//         try {
//             $mailchimp = new \MailchimpTransactional\ApiClient();
//             $mailchimp->setApiKey('xa46Xq4eJMaol-LxHlOreA');

//             $message = [
//                 "from_email" => "jordanphilippot@yahoo.fr",
//                 "subject" => $subject,
//                 // "text" => $title,
//                 "to" => [
//                     [
//                         "email" => $sendTo,
//                         "type" => "to"
//                     ]
//                 ]
//             ];


//             $response = $mailchimp->messages->sendTemplate([
//                 "template_name" => $templateName,
//                 "template_content" => [[]],
//                 "message" => $message,
//             ]);

//             print_r($response);
//         } catch (Error $e) {
//             echo 'Error: ', $e->getMessage(), "\n";
//         }
//     }
// }

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Support\Mailer;
use App\Support\Response;
use JsonException;
use Monolog\Logger;
use PHPMailer\PHPMailer\Exception as PHPMailerException;
use Psr\Http\Message\ResponseInterface;

class EmailController extends AbstractController
{

    /**
     * @param ContactRequest $input
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws JsonException
     */
    final public function sendContactUsEmail(ContactRequest $input, ResponseInterface $response): ResponseInterface
    {
        if ($input->failed()) {
            return Response::withJson($response, ["message" => "validation_error"], 400);
        }

        //$to = 'michal.prihoda@mmc.com';
        $to = 'Maschinen.versicherung@marsh.com';
        $subject = '{env} John Deere - Contact us message';

        try {
            $mailer = new Mailer();
            $mailer->mailer->Subject = str_replace('{env}', (MSAT_ENV . ' - '), $subject);
            $mailer->mailer->addAddress($to);
            //$mailer->mailer->addCC($cc);
            $mailer->mailer->Body = sprintf("%s\r\n%s\r\n%s", $input->name, $input->email, $input->message);
            if (!$mailer->mailer->send()) {
                throw new PHPMailerException();
            }
            return Response::withJson($response, 1);
        } catch (PHPMailerException $e) {
            /** @var Logger $logger */
            $logger = app()->getContainer()->get(Logger::class);
            $logger->error($e->getMessage());
            return Response::withJson($response, 0);
        }
    }
}
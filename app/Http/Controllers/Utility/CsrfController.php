<?php

namespace App\Http\Controllers\Utility;

use App\Http\Controllers\AbstractController;
use App\Support\Response;
use EasyCSRF\EasyCSRF;
use Exception;
use JsonException;
use Psr\Http\Message\ResponseInterface;
use Slim\Csrf\Guard;

class CsrfController extends AbstractController
{
    /**
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws Exception
     */
    public function getToken(ResponseInterface $response): ResponseInterface
    {
        /** @var Guard $csrfGenerator */
        $csrfGenerator = app()->getContainer()->get("csrf");
        return Response::withJson($response, $csrfGenerator->generateToken());
    }

    /**
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws JsonException
     */
    public function getTokenSimple(ResponseInterface $response): ResponseInterface
    {
        /** @var EasyCSRF $easyCSRF */
        $easyCSRF = app()->getContainer()->get(EasyCSRF::class);
        $token = $easyCSRF->generate('token');
        return Response::withJson($response, $token);
    }
}
<?php

namespace App\Http\Middleware;

use EasyCSRF\EasyCSRF;
use EasyCSRF\Exceptions\InvalidCsrfTokenException;
use Nyholm\Psr7\Stream;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Factory\ResponseFactory;

class CsrfMiddleware
{
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $apiEndpoint = env("API_ENDPOINT", "ops-v2");
        $strippedUri = str_replace("/$apiEndpoint/api", "", trim($request->getUri()->getPath()));
        if (strpos($strippedUri, "/register/insurance") !== false) {
            $responseFactory = new ResponseFactory();
            //Check if token is missing
            if (!isset($request->getParsedBody()["offer"]["csrf_token"])) {
                return $responseFactory->createResponse()->withStatus(403)->withBody(Stream::create("csrf_missing"));
            }
            /** @var EasyCSRF $easyCSRF */
            $easyCSRF = app()->getContainer()->get(EasyCSRF::class);
            try {
                //Check if token is correct and no longer than 1 hour
                $easyCSRF->check('token', $request->getParsedBody()["offer"]["csrf_token"], 60 * 60, true);
            } catch (InvalidCsrfTokenException $e) {
                $message = sprintf("%s \r\n %s", $e->getMessage(), session_encode() ?? '');
                return $responseFactory
                    ->createResponse()
                    ->withBody(Stream::create($message))
                    ->withStatus(403);
            }
        }
        return $handler->handle($request);
    }
}
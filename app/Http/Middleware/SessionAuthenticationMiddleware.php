<?php

namespace App\Http\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Factory\ResponseFactory;

class SessionAuthenticationMiddleware
{
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        foreach (app()->getContainer()->get("uriexceptions") as $exception) {
            if ($request->getUri()->getPath() === $exception) {
                return $handler->handle($request);
            }
        }
        $responseFactory = new ResponseFactory();
        return $responseFactory->createResponse()->withStatus(403);
    }
}
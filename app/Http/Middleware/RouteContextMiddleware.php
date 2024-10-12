<?php

namespace App\Http\Middleware;

use App\Http\HttpKernel;
use App\Http\Requests\FormRequest;
use App\Support\RequestInput;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Routing\RouteContext;

class RouteContextMiddleware
{
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $route = RouteContext::fromRequest($request)->getRoute();
        throw_when($route === null, "Route not found in request");

        //Bind RequestInput
        $input = new RequestInput($request, $route);
        app()->getContainer()->set(RequestInput::class, $input);

        //Bind Form Request Inputs
        $kernel = app()->getContainer()->get(HttpKernel::class);
        collect($kernel->requests)->each(function ($form) use ($request, $route) {
            app()->getContainer()->set($form, function () use ($form, $request, $route): FormRequest {
                $input = new $form($request, $route);
                $input->validate();
                return $input;
            });
        });

        //Handle request
        return $handler->handle($request);
    }
}
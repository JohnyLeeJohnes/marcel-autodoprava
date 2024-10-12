<?php

namespace App\Http;

use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\CsrfMiddleware;
use App\Http\Middleware\RouteContextMiddleware;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\InquiryDocumentRequest;
use App\Http\Requests\InquiryRequest;
use Boot\Foundation\HttpKernel as Kernel;

class HttpKernel extends Kernel
{
    /**
     * Injectable Request Input + Validation
     * @var array
     */
    public $requests = [
        ContactRequest::class,
    ];

    /**
     * Global middleware
     * @var array
     */
    public $middleware = [

    ];

    /**
     * Route group middleware
     * @var array[]
     */
    public $middlewareGroup = [
        "api" => [
            RouteContextMiddleware::class,
            //SessionAuthenticationMiddleware::class,
            CsrfMiddleware::class,
            CorsMiddleware::class,
        ],
        "web" => [
            //UserAuthenticationMiddleware::class,
        ],
    ];
}
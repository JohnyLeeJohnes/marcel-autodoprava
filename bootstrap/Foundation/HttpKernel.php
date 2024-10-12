<?php

namespace Boot\Foundation;

use Boot\Foundation\Bootstrappers\LoadCsrf;
use Boot\Foundation\Bootstrappers\LoadDatabase;
use Boot\Foundation\Bootstrappers\LoadDebuggingPage;
use Boot\Foundation\Bootstrappers\LoadDoctrine;
use Boot\Foundation\Bootstrappers\LoadEnvVariables;
use Boot\Foundation\Bootstrappers\LoadHttpMiddleware;
use Boot\Foundation\Bootstrappers\LoadMappers;
use Boot\Foundation\Bootstrappers\LoadPasswordHasher;
use Boot\Foundation\Bootstrappers\LoadRepositories;
use Boot\Foundation\Bootstrappers\LoadServiceProviders;
use Boot\Foundation\Bootstrappers\LoadSession;

class HttpKernel extends Kernel
{
    /**
     * Injectable Request Input + Validation
     * @var array
     */
    public $request = [

    ];

    /**
     * Global middleware
     * @var array
     */
    public $middleware = [];

    /**
     * Route group middleware
     * @var array[]
     */
    public $middlewareGroup = [
        "api" => [],
        "web" => [],
    ];

    public $bootstrap = [
        LoadSession::class,
        LoadEnvVariables::class,
        LoadDebuggingPage::class,
        LoadCsrf::class,
        LoadHttpMiddleware::class,
        LoadServiceProviders::class,
        LoadDatabase::class,
        LoadRepositories::class,
        LoadMappers::class,
    ];
}
<?php

namespace Boot\Foundation\Bootstrappers;

use Slim\App;

abstract class AbstractBootstrapper
{
    public $app;

    final public function __construct(App $app)
    {
        $this->app = $app;
    }

    abstract public function boot();
}
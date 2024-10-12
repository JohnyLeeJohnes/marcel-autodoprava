<?php

namespace Boot\Foundation\Bootstrappers;

use Slim\App;

class Bootstrapper
{
    public $app;

    final public function __construct(App $app)
    {
        $this->app = $app;
    }

    final public static function setup(App $app, array $loaders): void
    {
        $loaders = array_map(static function ($loader) use ($app) {
            return new $loader($app);
        }, $loaders);

        array_walk($loaders, static function (AbstractBootstrapper $boot) {
            $boot->boot();
        });
    }
}
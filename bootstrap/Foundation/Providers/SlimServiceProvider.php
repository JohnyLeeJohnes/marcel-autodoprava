<?php

namespace Boot\Foundation\Providers;

use Slim\App;

abstract class SlimServiceProvider
{
    public $app;
    public $container;

    final public function __construct(App $app)
    {
        $this->app = $app;
        $this->container = $this->app->getContainer();

        if (method_exists($this, 'beforeRegistering')) {
            $this->beforeRegistering();
        }
    }

    public function bind($key, callable $resolvable): void
    {
        $this->container->set($key, $resolvable);
    }

    public function resolve($key)
    {
        return $this->container->get($key);
    }

    final public static function setup(App $app, array $providers): void
    {
        collect($providers)->map(function ($provider) use ($app) {
            return new $provider($app);
        })->each(function (SlimServiceProvider $provider) {
            self::runWhenExists($provider, "register");
        })->each(function (SlimServiceProvider $provider) {
            self::runWhenExists($provider, "boot");
        });
    }

    private static function runWhenExists(SlimServiceProvider $provider, string $method)
    {
        return method_exists($provider, $method) ? $provider->$method() : null;
    }
}
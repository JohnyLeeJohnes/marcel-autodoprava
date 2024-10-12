<?php

namespace Boot\Foundation\Bootstrappers;

use Boot\Foundation\Kernel;

class LoadHttpMiddleware extends AbstractBootstrapper
{
    public function boot(): void
    {
        $kernel = $this->app->getContainer()->get(Kernel::class);

        $middleware = array_merge(
            $kernel->middleware,
            $kernel->middlewareGroup["api"],
            $kernel->middlewareGroup["web"]
        );

        collect($middleware)->filter(function ($item) {
            return class_exists($item);
        })->each(function ($guard) {
            $this->app->getContainer()->set($guard, new $guard);
        });

        $this->app->getContainer()->set("middleware", static function () use ($kernel) {
            return [
                "global" => $kernel->middleware,
                "api"    => $kernel->middlewareGroup["api"],
                "web"    => $kernel->middlewareGroup["web"],
            ];
        });
    }
}
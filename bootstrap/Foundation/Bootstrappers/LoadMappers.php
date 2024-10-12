<?php

namespace Boot\Foundation\Bootstrappers;

class LoadMappers extends AbstractBootstrapper
{
    public function boot(): void
    {
        $mappers = config_get("app.mappers");
        collect($mappers)->filter(function ($mapper) {
            return class_exists($mapper);
        })->each(function ($mapper) {
            $this->app->getContainer()->set($mapper, new $mapper($this->app));
        });
    }
}
<?php

namespace Boot\Foundation\Bootstrappers;

class LoadRepositories extends AbstractBootstrapper
{
    public function boot(): void
    {
        $repositories = config_get("app.repositories");
        collect($repositories)->filter(function ($repository) {
            return class_exists($repository);
        })->each(function ($repository) {
            $this->app->getContainer()->set($repository, new $repository($this->app));
        });
    }
}
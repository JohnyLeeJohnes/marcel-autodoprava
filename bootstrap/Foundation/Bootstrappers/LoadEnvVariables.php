<?php

namespace Boot\Foundation\Bootstrappers;

use Dotenv\Dotenv;

class LoadEnvVariables extends AbstractBootstrapper
{
    public function boot(): void
    {
        $env = Dotenv::createImmutable(base_path());
        $env->load();
    }
}
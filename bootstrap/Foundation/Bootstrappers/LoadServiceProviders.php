<?php

namespace Boot\Foundation\Bootstrappers;

use App\Providers\AbstractServiceProvider;

class LoadServiceProviders extends AbstractBootstrapper
{
    public function boot(): void
    {
        AbstractServiceProvider::setup($this->app, config_get("app.providers"));
    }
}
<?php

namespace App\Providers;

class UriExceptionsProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind("uriexceptions", function () {
            return [];
        });
    }

    public function boot(): void
    {

    }
}
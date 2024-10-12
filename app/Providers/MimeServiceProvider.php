<?php

namespace App\Providers;

use App\Service\MimeService;

class MimeServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(MimeService::class, function () {
            return new MimeService();
        });
    }

    public function boot(): void
    {

    }
}
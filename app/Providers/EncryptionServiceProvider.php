<?php

namespace App\Providers;

use App\Service\EncryptionService;

class EncryptionServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(EncryptionService::class, function () {
            return new EncryptionService();
        });
    }

    public function boot(): void
    {

    }
}
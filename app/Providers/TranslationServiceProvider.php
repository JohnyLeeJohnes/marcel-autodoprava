<?php

namespace App\Providers;

use App\Service\TranslationService;

class TranslationServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(TranslationService::class, function () {
            return new TranslationService();
        });
    }

    public function boot(): void
    {

    }
}
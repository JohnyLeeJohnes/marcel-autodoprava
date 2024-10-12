<?php

namespace App\Providers;

use App\Service\PDFService;

class PDFServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(PDFService::class, function () {
            return new PDFService();
        });
    }

    public function boot(): void
    {
    }
}
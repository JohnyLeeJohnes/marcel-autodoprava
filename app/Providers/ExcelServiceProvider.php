<?php

namespace App\Providers;

use App\Service\ExcelService;

class ExcelServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(ExcelService::class, function () {
            return new ExcelService();
        });
    }

    public function boot(): void
    {
    }
}
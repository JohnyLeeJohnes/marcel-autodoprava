<?php

namespace App\Providers;

use App\Service\FileService;

class FileServiceProvider extends AbstractServiceProvider
{

    public function register(): void
    {
        $this->bind(FileService::class, function () {
            return new FileService();
        });
    }

    public function boot(): void
    {

    }
}
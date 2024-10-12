<?php

namespace Boot\Foundation\Providers;

use Illuminate\Filesystem\Filesystem;

class FileSystemServiceProvider extends SlimServiceProvider
{
    public function register(): void
    {
        $this->app->getContainer()->set(Filesystem::class, new Filesystem());
    }
}
<?php

namespace App\Providers;

use Boot\Foundation\Providers\SlimServiceProvider;

abstract class AbstractServiceProvider extends SlimServiceProvider
{
    abstract public function register(): void;

    abstract public function boot(): void;
}
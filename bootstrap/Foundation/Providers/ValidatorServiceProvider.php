<?php

namespace Boot\Foundation\Providers;

use Boot\Foundation\Http\ValidatorFactory;
use Illuminate\Translation\Translator;

class ValidatorServiceProvider extends SlimServiceProvider
{
    public function register(): void
    {
        $this->bind(ValidatorFactory::class, function (Translator $translator) {
            return new ValidatorFactory($translator);
        });
    }
}
<?php

namespace Boot\Foundation\Providers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;

class TranslatorServiceProvider extends SlimServiceProvider
{
    public function register(): void
    {
        $this->app->getContainer()->set(FileLoader::class, function (Filesystem $files) {
            return new FileLoader($files, config_get("translate.path"));
        });

        $this->app->getContainer()->set(Translator::class, function (FileLoader $loader) {
            $loader->addNamespace("languages", config_get("translate.path"));
            $loader->load(config_get("app.locale"), "validation", "languages");
            return new Translator($loader, config_get("app.locale"));
        });
    }
}
<?php

use App\Mapper\TranslationMapper;
use App\Providers\EncryptionServiceProvider;
use App\Providers\FileServiceProvider;
use App\Providers\MimeServiceProvider;
use App\Providers\PDFServiceProvider;
use App\Providers\RouterServiceProvider;
use App\Providers\TranslationServiceProvider;
use App\Providers\UriExceptionsProvider;
use App\Repository\TranslationRepository;
use Boot\Foundation\Providers\FileSystemServiceProvider;
use Boot\Foundation\Providers\RouteServiceProvider;
use Boot\Foundation\Providers\TranslatorServiceProvider;
use Boot\Foundation\Providers\ValidatorServiceProvider;

return [
    'name'         => env("APP_NAME", "Autodoprava Marcel Černošek"),
    'timezone'     => 'Europe/Prague',
    'locale'       => 'cs',
    'faker_locale' => 'cs-CZ',
    'providers'    => [
        /* Boot Service Providers */
        FileSystemServiceProvider::class,
        TranslatorServiceProvider::class,
        ValidatorServiceProvider::class,
        RouteServiceProvider::class,

        /* App Service Providers */
        RouterServiceProvider::class,
        MimeServiceProvider::class,
        FileServiceProvider::class,
        EncryptionServiceProvider::class,
        TranslationServiceProvider::class,
        UriExceptionsProvider::class,
        PDFServiceProvider::class,
    ],
    'repositories' => [
        TranslationRepository::class,
    ],
    'mappers'      => [
        TranslationMapper::class,
    ]
];
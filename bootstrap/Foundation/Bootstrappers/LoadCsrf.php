<?php

namespace Boot\Foundation\Bootstrappers;

use EasyCSRF\EasyCSRF;
use EasyCSRF\NativeSessionProvider;
use Slim\Csrf\Guard;
use Slim\Psr7\Factory\ResponseFactory;

class LoadCsrf extends AbstractBootstrapper
{
    public function boot(): void
    {
        $sessionProvider = new NativeSessionProvider();
        $this->app->getContainer()->set(EasyCSRF::class, function () use ($sessionProvider) {
            return new EasyCSRF($sessionProvider);
        });
        $this->app->getContainer()->set('csrf', function (ResponseFactory $factory) {
            return new Guard($factory);
        });
    }
}
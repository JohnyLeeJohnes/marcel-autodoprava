<?php

namespace Boot\Foundation\Bootstrappers;

use Boot\Foundation\Http\Session;

class LoadSession extends AbstractBootstrapper
{
    public function boot(): void
    {
        $session = new Session();
        $session->start();
        $this->app->getContainer()->set(Session::class, $session);
    }
}
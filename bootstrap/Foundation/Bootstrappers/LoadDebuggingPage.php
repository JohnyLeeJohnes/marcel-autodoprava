<?php

namespace Boot\Foundation\Bootstrappers;

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

class LoadDebuggingPage extends AbstractBootstrapper
{
    public function boot(): void
    {
        if (env("APP_DEBUG", false)) {
            //Logging handler
            $this->app->addRoutingMiddleware();
            $logger = new Logger("appLogger");
            if (!env("APP_DEBUG")) {
                $logger->pushHandler(new StreamHandler(base_path("logs/warning.log"), Logger::WARNING));
                $logger->pushHandler(new StreamHandler(base_path("logs/errors.log"), Logger::ERROR));
                $logger->pushHandler(new StreamHandler(base_path("logs/info.log"), Logger::INFO));
            } else {
                $logger->pushHandler(new StreamHandler(base_path("logs/all.log"), Logger::DEBUG));
            }
            $this->app->getContainer()->set(Logger::class, $logger);

            //Add error middleware + logger
            $this->app->addErrorMiddleware(
                config_get("settings.error_details.displayErrorDetails"),
                config_get("settings.error_details.logErrors"),
                config_get("settings.error_details.logErrorDetails"),
                $logger
            );
        }
    }
}
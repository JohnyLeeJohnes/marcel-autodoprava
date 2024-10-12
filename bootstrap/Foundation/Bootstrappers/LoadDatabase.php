<?php

namespace Boot\Foundation\Bootstrappers;

use ClanCats\Hydrahon\Builder;
use Dibi\Connection;
use Dibi\Exception;

class LoadDatabase extends AbstractBootstrapper
{
    /**
     * @return void
     * @throws Exception
     * @throws \ClanCats\Hydrahon\Exception
     */
    public function boot(): void
    {
        //Setup connection to DB
        $this->app->getContainer()->set(Connection::class, function () {
            switch (MSAT_ENV) {
                case "DEV":
                    $conf = "database.environments.docker";
                    break;
                default:
                    $conf = "database.environments.default";
            }
            return new Connection(config_get($conf));
        });

        //Setup Query builder
        $this->app->getContainer()->set(Builder::class, function () {
            $connection = $this->app->getContainer()->get(Connection::class);
            return new Builder('mysql', function ($_, string $sql, $params) use ($connection) {
                return $connection->query($sql, ...$params);
            });
        });

        //Set default timezone
        date_default_timezone_set(config_get("app.timezone"));
    }
}
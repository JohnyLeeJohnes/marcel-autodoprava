<?php

namespace App\Providers;

use App\Support\Route;
use App\Support\RouteGroup;

class RouterServiceProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        Route::setup($this->app);
        $this->bind(RouteGroup::class, function () {
            return new RouteGroup($this->app);
        });
    }

    public function boot(): void
    {
        $this->apiRouteGroup()->register();
        $this->webRouteGroup()->register();
    }

    public function webRouteGroup(): RouteGroup
    {
        $get = routes_path("web.php");
        $add = $this->resolve("middleware");
        $api = $this->resolve(RouteGroup::class);

        return $api->setRoutes($get)->setPrefix("/")->setMiddleware(
            array_merge(
                $add["web"] ?? [],
                $add["global"] ?? []
            )
        );
    }

    public function apiRouteGroup(): RouteGroup
    {
        $get = routes_path("api.php");
        $add = $this->resolve("middleware");
        $api = $this->resolve(RouteGroup::class);

        $apiEndpoint = env("API_ENDPOINT", "ops-v2");
        return $api->setRoutes($get)->setPrefix("/$apiEndpoint/api")->setMiddleware(
            array_merge(
                $add["api"] ?? [],
                $add["global"] ?? []
            )
        );
    }
}
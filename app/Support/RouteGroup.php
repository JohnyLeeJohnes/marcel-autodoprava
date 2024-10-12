<?php

namespace App\Support;

use Slim\Routing\RouteCollectorProxy;

class RouteGroup
{
    public $app;
    public $prefix;
    public $routes;
    public $middleware = [];

    public function __construct($app)
    {
        $this->app = $app;
    }

    /**
     * Create a SubRoute group with middlewares
     * @return void
     */
    public function register()
    {
        //Create a Group -> sub route
        $group = $this->app->group($this->prefix, function (RouteCollectorProxy $group) {
            $app = Route::setup($group);
            require $this->routes;
        });

        //Add all middlewares to each group
        collect($this->middleware)->each(function ($guard) use ($group) {
            $group->add($this->app->getContainer()->get($guard));
        });

        //attach route back to app
        Route::setup($this->app);
    }

    #region Setters
    public function setPrefix(string $prefix): RouteGroup
    {
        $this->prefix = $prefix;
        return $this;
    }

    public function setRoutes(string $routesPath = ""): RouteGroup
    {
        $this->routes = $routesPath;
        return $this;
    }

    public function setMiddleware(array $middleware): RouteGroup
    {
        $this->middleware = $middleware;
        return $this;
    }
    #endregion
}
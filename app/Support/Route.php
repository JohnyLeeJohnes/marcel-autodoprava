<?php

namespace App\Support;

use Illuminate\Support\Str;
use JsonException;
use Monolog\Logger;

class Route
{
    protected static $app;

    public static function setup($app)
    {
        self::$app = $app;
        return $app;
    }

    public static function route($method, $route, $action = "AbstractController@default")
    {
        $app = self::$app;
        self::validateRoute($route, $method, $action);
        return is_callable($action)
            ? $app->$method($route, $action)
            : $app->$method($route, self::resolveViaController($action));
    }

    public static function resolveViaController($action): array
    {
        $class = Str::before($action, '@');
        $method = Str::after($action, '@');
        $namespaces = config_get('routing.controllers.namespaces');
        foreach ($namespaces as $namespace) {
            if (class_exists($namespace . $class)) {
                $controller = $namespace . $class;
            }
        }
        throw_when(!isset($controller), "Unresolvable action, wasn't able to find controller for $action");
        return [$controller, $method];
    }

    public static function validateRoute($route, $verb, $action)
    {
        try {
            $exception = "Unresolvable Route Callback/Controller action";
            $context = json_encode(compact('route', 'action', 'verb'), JSON_THROW_ON_ERROR);
            $fails = !((is_callable($action)) or (is_string($action) and Str::is("*@*", $action)));
            throw_when($fails, $exception . $context);
        } catch (JsonException $e) {
            /** @var Logger $logger */
            $logger = app()->getContainer()->get(Logger::class);
            $logger->error($e->getMessage());
            var_dump($e);
        }
    }
}
<?php

use App\Http\HttpKernel;
use DI\Bridge\Slim\Bridge as App;
use DI\Container;

$app = App::create(new Container());
$app->getContainer()->set(HttpKernel::class, new HttpKernel($app));

$_SERVER["app"] = $app;

return $app;
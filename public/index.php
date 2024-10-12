<?php
/* Set ENV */
if (!isset($_SERVER["MSAT_ENV"])) {
    $_SERVER["MSAT_ENV"] = "DEV";
}

/* Autoload global dependencies */
require __DIR__ . '/../vendor/autoload.php';

/* Bootup application */
$app = require __DIR__ . "/../bootstrap/app.php";

/* Start the app */
$app->run();
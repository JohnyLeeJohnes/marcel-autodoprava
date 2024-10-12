<?php

use App\Support\Route;

Route::route("get", "{path:.*}", "WebEndpointController@default");
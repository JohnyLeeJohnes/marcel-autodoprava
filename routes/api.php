<?php

use App\Support\Response;
use App\Support\Route;

Route::route("get", "/assets/msat-cookie-json", static function ($request, $response) {
    return Response::withPlainJson($response, file_get_contents("../public/msat-cookies-handler-config.json"));
});

/** Utility routes */
Route::route("post", "/security/csrf", "CsrfController@getTokenSimple");
Route::route("post", "/contactus", "EmailController@sendContactUsEmail");
Route::route("post", "/config/translations", "ConfigurationController@fetchTranslations");
Route::route("post", "/config/configuration", "ConfigurationController@fetchConfiguration");
Route::route("get", "/excel/generate", "DocumentController@getExcel");

/** Main routes */
Route::route("post", "/inquiry/register", "InquiryController@register");
Route::route("post", "/inquiry/document", "DocumentController@getDocument");
Route::route("get", "/inquiry/document/{id}", "DocumentController@getDocumentById");

/** Preflight - must be there for each endpoint of axios */
Route::route("options", "/{routes:.*}");

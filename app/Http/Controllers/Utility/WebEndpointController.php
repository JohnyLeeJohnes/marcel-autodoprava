<?php

namespace App\Http\Controllers\Utility;

use App\Http\Controllers\AbstractController;
use App\Service\MimeService;
use App\Support\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Routing\RouteContext;

class WebEndpointController extends AbstractController
{
    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function default(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        //Get route Path
        $route = RouteContext::fromRequest($request)->getRoute();
        $apiEndpoint = env("API_ENDPOINT", "ops-v2");
        $path = str_replace("$apiEndpoint/", "", $route->getArgument("path"));
        $path = empty($path) ? false : realpath("../client/dist/$path");
        $indexPath = realpath("../client/dist/index.html");
        $path = $path ?: $indexPath;
        $content = file_get_contents($path);

        //Generate eTag
        $eTag = sha1_file($path);
        $match = $request->getHeader('If-None-Match');
        if (is_string($eTag) && reset($match) === $eTag) {
            return $response->withStatus(304);
        }

        //Get Mime Type
        $mimeService = app()->getContainer()->get(MimeService::class);
        $mimeType = $mimeService->detectWithDefault($path);

        return Response::withWebHeaders($response, $mimeType, $eTag, $content);
    }
}
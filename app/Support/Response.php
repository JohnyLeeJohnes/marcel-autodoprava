<?php

namespace App\Support;

use JsonException;
use Nyholm\Psr7\Stream;
use Psr\Http\Message\ResponseInterface;

class Response
{
    /**
     * Return response data in JSON format
     * @param ResponseInterface $response
     * @param mixed $payload
     * @param int $status
     * @return ResponseInterface
     * @throws JsonException
     */
    public static function withJson(ResponseInterface $response, $payload, int $status = 200): ResponseInterface
    {
        $response->getBody()->write(json_encode($payload, JSON_THROW_ON_ERROR));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }

    public static function withPlainJson(ResponseInterface $response, $payload, int $status = 200): ResponseInterface
    {
        $response->getBody()->write($payload);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }

    public static function withWebHeaders(ResponseInterface $response, string $mimeType, string $eTag, $content): ResponseInterface
    {
        return $response
            ->withHeader('Content-Type', $mimeType)
            ->withHeader('Cache-Control', 'public, max-age=3600')
            ->withHeader('Content-Length', strlen($content))
            ->withHeader('ETag', $eTag)
            ->withHeader('Pragma', 'public')
            ->withBody(Stream::create($content));
    }
}
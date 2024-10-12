<?php

namespace App\Http\Controllers;

use App\Repository\AbstractRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AbstractController
{
    /** @var $repository AbstractRepository */
    protected $repository;

    /**
     * Default response for request
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function default(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return $response;
    }
}
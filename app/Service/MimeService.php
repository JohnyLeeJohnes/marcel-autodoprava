<?php

namespace App\Service;

use League\MimeTypeDetection\FinfoMimeTypeDetector;
use Throwable;
use function pathinfo;
use const PATHINFO_EXTENSION;

class MimeService
{
    /** @var FinfoMimeTypeDetector */
    protected $mimeDetector;

    public function __construct()
    {
        $this->mimeDetector = new FinfoMimeTypeDetector();
    }

    public function detect(string $file): ?string
    {
        static $map = [
            'svg'   => 'image/svg+xml',
            'png'   => 'image/png',
            'js'    => 'application/javascript; charset=utf-8',
            'woff2' => 'font/woff2',
            'css'   => 'text/css; charset=utf-8',
            'html'  => 'text/html; charset=utf-8',
        ];

        return $map[pathinfo($file, PATHINFO_EXTENSION)] ?? $this->mimeDetector->detectMimeTypeFromFile($file);
    }

    public function detectWithDefault(string $file): ?string
    {
        try {
            return $this->detect($file) ?? 'text/plain';
        } catch (Throwable $throwable) {
            return 'text/plain';
        }
    }
}
<?php

namespace App\Mapper;

use App\Entity\AbstractEntity;

abstract class AbstractMapper
{
    protected $app;

    public function __construct($app)
    {
        $this->app = $app;
    }

    public function map(iterable $items, string $locale = 'cs-CZ'): array
    {
        return array_map(function ($item) use ($locale) {
            return $this->toArray($item, $locale);
        }, (array)$items);
    }

    public function mapSingle(AbstractEntity $item, string $locale = 'cs-CZ'): array
    {
        return $this->toArray($item, $locale);
    }

    abstract public function toArray($item, string $locale): array;
}
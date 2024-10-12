<?php

namespace App\Repository;

use App\Entity\Translation;

class TranslationRepository extends AbstractRepository
{
    /**
     * @param $app
     * @noinspection PhpUndefinedMethodInspection
     */
    public function __construct($app)
    {
        parent::__construct($app, Translation::class);
        $this->table = $this->builder->table('translation');
    }
}
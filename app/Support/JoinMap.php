<?php

namespace App\Support;

class JoinMap
{
    //INNER JOIN <table>
    public $table;
    //ON <key.id>
    public $key;
    //<foreginKey.id
    public $foreginKey;
    //=
    public $operator = '=';

    /**
     * @param string $table
     * @param string $key
     * @param string $foreginKey
     * @param string $operator
     */
    public function __construct(string $table, string $key, string $foreginKey, string $operator = '=')
    {
        $this->table = $table;
        $this->key = $key;
        $this->foreginKey = $foreginKey;
        $this->operator = $operator;
    }
}
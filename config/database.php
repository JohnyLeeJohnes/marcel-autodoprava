<?php
return [
    'environments' => [
        'default' => [
            'driver'   => 'mysqli',
            'host'     => MSAT_DATABASE_MYSQL_HOST,
            'username' => 'exec_php_de',
            'password' => $hsl,
            'database' => 'de_main',
            'name'     => 'de_main',
            'port'     => 3306,
            'charset'  => 'utf8',
        ],
        'docker'  => [
            'driver'   => 'mysqli',
            'host'     => 'mysql-jd',
            'username' => 'exec_php_de',
            'password' => $defaultHsl,
            'database' => 'de_main',
            'name'     => 'de_main',
            'port'     => 3306,
            'charset'  => 'utf8',
        ],
    ],
];
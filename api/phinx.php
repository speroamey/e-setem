<?php
require __DIR__ . '/public/index.php';
$config = $container['settings']['db'];

    return [
        'paths'=>[
            'migrations'=>'src/database/migrations'
        ],
        "migration_base_class"=>'\App\Migration\Migration',
        'templates'=>[
            'file'=>'src/Database/Migrations/MigrationStub.php'
        ],

        'environments'=>[
            'default_migration_table'=>'migrations',
            'default'=>[
                'adapter'=>$config['driver'],
                'host'=>$config['host'],
                'name'=>$config['database'],
                'user'=>$config['username'],
                'pass'=>$config['password'],
            ]
        ]
    ];
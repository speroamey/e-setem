<?php

use Illuminate\Database\Schema\Blueprint;
use $useClassName;


class $className extends $baseClassName
{
    public function up(){
   
        $this->schema->create('',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->date('expiration_date');
            $table->timestamps();
        });
        $this->schema->table('',function(Blueprint $table){
            
        });
    }
    public function down(){
        $this->schema->drop('');

        $this->schema->table('',function(Blueprint $table){
        });
    }
   
}
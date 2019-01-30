<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Branches extends Migration
{
    public function up(){
   
        $this->schema->create('branches',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->timestamps();
        });
        
    }
    public function down(){
        $this->schema->drop('branches');

        
    }
   
}
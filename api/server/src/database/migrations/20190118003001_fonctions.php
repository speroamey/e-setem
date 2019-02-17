<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Fonctions extends Migration
{
    public function up(){
   
        $this->schema->create('fonctions',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->timestamps();
        });
       
    }
    public function down(){
        $this->schema->drop('fonctions');

        
    }
   
}
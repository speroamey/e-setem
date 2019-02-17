<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class PersonnesRessources extends Migration
{
    public function up(){
   
        $this->schema->create('personnes_ressources',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('entreprise');
            $table->string('fonctions');
            $table->string('contact');
          
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('personnes_ressources');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
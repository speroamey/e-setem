<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class RessourcesMissions extends Migration
{
    public function up(){
   
        $this->schema->create('ressources_missions',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('id_personnels');
            $table->string('id_missions');
            $table->string('id_immobiliers');
            $table->timestamps();
        });
        
    }
    public function down(){
        $this->schema->drop('ressources_missions');

    }
   
}
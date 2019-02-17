<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class AssurancesImmobiliere extends Migration
{
    public function up(){
   
        $this->schema->create('assureurs_immobilier',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('assureur');
            $table->date('date_debut');
            $table->date('date_expiration');
            $table->timestamps();
        });
    }

    public function down(){
        $this->schema->drop('assureurs_immobilier');
    }
   
}
<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class PositionsImmobiliere extends Migration
{
    public function up(){
   
        $this->schema->create('positions_immobiliere',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->date('date_prise');
            $table->date('date_retour');
            $table->string('personnel_id');
            $table->timestamps();
        });
       
    }
    public function down(){
        $this->schema->drop('positions_immobiliere');

    }
   
}
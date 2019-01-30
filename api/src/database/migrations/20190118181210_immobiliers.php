<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Immobiliers extends Migration
{
    public function up(){
   
        $this->schema->create('immobiliers',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->string('num_plaque')->nullable();
            $table->string('num_chassis')->nullable();
            $table->string('marque')->nullable();
            $table->string('nbr_place')->nullable();
            $table->string('description')->nullable();
            $table->date('date_acquisition');
            $table->date('date_amortissement')->nullable();
            $table->timestamps();
        });
     
    }
    public function down(){
        $this->schema->drop('immobiliers');

    }
   
}
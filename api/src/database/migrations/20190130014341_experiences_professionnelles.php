<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class ExperiencesProfessionnelles extends Migration
{
    public function up(){
   
        $this->schema->create('experiences_professionnelles',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('nom_employeur');
            $table->string('fonctions');
            $table->string('pays');
            $table->string('resume');
            $table->date('start_date');
            $table->date('end_date');
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
<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class CompetencesBranchesAptitudes extends Migration
{
    public function up(){
        $this->schema->create('competences_branches_aptitudes',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('aptitude_id');
            $table ->foreign('aptitude_id')->references('id')->on('aptitudes');
            $table -> unsignedInteger ('competence_id');
            $table ->foreign('competence_id')->references('id')->on('competences');
            $table -> unsignedInteger ('branche_id');
            $table ->foreign('branche_id')->references('id')->on('branches');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('competences_branches_aptitudes');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
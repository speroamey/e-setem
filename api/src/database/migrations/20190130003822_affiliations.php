<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Affiliations extends Migration
{
    public function up(){
   
        $this->schema->create('affiliations',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('nom_association');
            $table->string('objet');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('affiliations');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
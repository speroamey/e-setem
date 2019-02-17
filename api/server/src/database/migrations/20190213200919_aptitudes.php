<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Aptitudes extends Migration
{
    public function up(){
   
        $this->schema->create('aptitudes',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('aptitude');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('aptitudes');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
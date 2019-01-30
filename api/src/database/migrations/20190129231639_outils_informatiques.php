<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class OutilsInformatiques extends Migration
{
    public function up(){
   
        $this->schema->create('outils_informatiques',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('nom');
            $table->string('type');
            $table->string('niveau');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('outils_informatiques');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Langues extends Migration
{
    public function up(){
   
        $this->schema->create('langues',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('langue')->nullable();
            $table->string('lecture')->nullable();
            $table->string('parle')->nullable();
            $table->string('ecriture')->nullable();
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('langues');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
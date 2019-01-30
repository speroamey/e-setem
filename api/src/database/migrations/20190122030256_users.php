<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Users extends Migration
{
    public function up(){
   
        $this->schema->create('users',function(Blueprint $table){
            $table->increments('id');
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('username');
            $table->string('password');
            $table->string('roles');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('users');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Users extends Migration
{
    public function up(){
   
        $this->schema->create('users',function(Blueprint $table){
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('username');
            $table->string('password');
            $table->string('roles');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('phone')->nullable();
            $table->string('titre')->nullable();
            $table->string('ifu')->nullable();
            $table->string('conjoint')->nullable();
            $table->string('anciennete')->nullable();
            $table->string('nationalite')->nullable();
            $table->string('categorie')->nullable();
            $table->string('sexe')->nullable();
            $table->date('birthday')->nullable();
            $table->string('type')->nullable();
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
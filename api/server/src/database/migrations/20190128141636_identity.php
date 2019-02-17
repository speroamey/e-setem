<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Identity extends Migration
{
    public function up(){
   
        $this->schema->create('identities',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ( 'user_id' );
            $table ->foreign ( 'user_id')->references('id')-> on('users')->unique();
            $table->string('last_name');
            $table->string('first_name');
            $table->date('birthday');
            $table->string('address');
            $table->string('phone');
            $table->string('sexe');
            $table->string('email');
            $table->string('titre');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('identities');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
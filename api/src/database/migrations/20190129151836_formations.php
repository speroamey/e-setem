<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Formations extends Migration
{
    public function up(){
   
        $this->schema->create('formations',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ( 'user_id' );
            $table ->foreign( 'user_id')->references('id')-> on('users');
            $table->string('ecole');
            $table->string('diplome');
            $table->string('domaine');
            $table->string('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('formations');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
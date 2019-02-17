<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class PiecesAdministratives extends Migration
{
    public function up(){
   
        $this->schema->create('pieces_administratives',function(Blueprint $table){
            $table->increments('id');
            $table -> unsignedInteger ('user_id');
            $table ->foreign('user_id')->references('id')->on('users');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->string('numero');
            $table->string('pays');
            $table->string('lieu');
            $table->string('validite')->nullable();
            $table->date('expiration_date');
            $table->timestamps();
        });
        // $this->schema->table('',function(Blueprint $table){
            
        // });
    }
    public function down(){
        $this->schema->drop('pieces_administratives');

        // $this->schema->table('',function(Blueprint $table){
        // });
    }
   
}
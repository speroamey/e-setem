<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class PiecesAdministratives extends Migration
{
    public function up(){
   
        $this->schema->create('pieces_administratives',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
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
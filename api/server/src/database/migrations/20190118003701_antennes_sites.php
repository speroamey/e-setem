<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class AntennesSites extends Migration
{
    public function up(){
   
        $this->schema->create('antennes_sites',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->string('adress');
            $table->timestamps();
        });
        
        // $this->schema->table('antennes_sites',function(Blueprint $table){
        //     $table->string('adress');
        // });
    }
    public function down(){
        // $this->schema->drop('antennes_sites');
        $this->schema->table('antennes_sites',function(Blueprint $table){
            
        });
    }
   
}
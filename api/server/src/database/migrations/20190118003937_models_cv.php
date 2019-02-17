<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class ModelsCv extends Migration
{
    public function up(){
   
        $this->schema->create('models_cv',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('libelle');
            $table->date('expiration_date');
            $table->timestamps();
        });
        
    }
    public function down(){
        $this->schema->drop('models_cv');

    }
   
}
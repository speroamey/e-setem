<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Missions extends Migration
{
    public function up(){
   
        $this->schema->create('missions',function(Blueprint $table){
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('numero_missions');
            $table->date('date_departs');
            $table->date('date_arrive_prevus');
            $table->string('cadres');
            $table->string('objets');
            $table->string('id_chef_missions');
            $table->timestamps();
        });
       
    }
    public function down(){
        $this->schema->drop('missions');

    }
   
}
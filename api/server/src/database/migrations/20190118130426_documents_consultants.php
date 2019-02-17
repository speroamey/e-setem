<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class DocumentsConsultants extends Migration
{
    public function up(){
   
        $this->schema->create('documents_consultants',function(Blueprint $table){
            $table->increments('id');
            $table->string('types_documents');
            $table->string('libelle');
            $table->date('model');
            $table->timestamps();
        });
      
    }
    public function down(){
        $this->schema->drop('documents_consultants');

    }
   
}
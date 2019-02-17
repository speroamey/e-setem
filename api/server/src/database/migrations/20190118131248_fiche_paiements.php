<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class FichePaiements extends Migration
{
    public function up(){
   
        $this->schema->create('fiche_paiement',function(Blueprint $table){
            $table->increments('id');
            $table->string('percu');
            $table->date('date_fin');
            $table->date('date_debut');
            $table->timestamps();
        });
       
    }
    public function down(){
        $this->schema->drop('fiche_paiement');

    }
   
}
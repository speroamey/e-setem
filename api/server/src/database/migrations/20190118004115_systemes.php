<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class Systemes extends Migration
{
    public function up(){
   
        $this->schema->create('systemes',function(Blueprint $table){
            $table->increments('id');
            $table->integer('prise_immobilisation');
            $table->integer('rapports');
            // $table->date('expiration_date');
            $table->integer('expiration_cin');
            $table->integer('expiration_passport');
            $table->integer('expiration_pieces_administratives');
            $table->integer('expiration_assurances');
            $table->integer('expiration_visite_technique');
            $table->integer('offre_manifestation_d_interet');
            $table->integer('echeance_paiements');
            $table->timestamps();
        });
        
    }
    public function down(){
        $this->schema->drop('systemes');
    }
   
}
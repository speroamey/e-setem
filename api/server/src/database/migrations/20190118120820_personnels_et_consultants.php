<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class PersonnelsEtConsultants extends Migration
{
    public function up(){
   
        $this->schema->create('personnels_et_consultants',function(Blueprint $table){
            $table->increments('id');
            $table->string('num_ifu')->nullable();
            $table->string('antennes_sites')->nullable();
            $table->string('fonctions')->nullable();
            $table->string('departements_services')->nullable();
            $table->string('type_collaborateur');
            $table->string('num_permis')->nullable();
            $table->string('categorie_permis')->nullable();
            $table->date('date_naissance');
            $table->string('nom_prenoms');
            $table->date('date_embauche');
            $table->string('num_passport')->nullable();
            $table->date('expiration_passport')->nullable();
            $table->string('num_cin')->nullable();
            $table->string('anciennete')->nullable();
            $table->string('address')->nullable();
            $table->string('num_tel')->nullable();
            $table->string('nationalite')->nullable();    
            $table->string('categorie')->nullable();
            $table->date('expiration_cin')->nullable();
            $table->timestamps();
        });
       
    }
    public function down(){
        $this->schema->drop('parametres_et_consultants');

      
    }
   
}
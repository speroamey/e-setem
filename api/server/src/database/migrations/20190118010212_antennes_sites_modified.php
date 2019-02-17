<?php

use Illuminate\Database\Schema\Blueprint;
use \App\Migration\Migration;


class AntennesSitesModified extends Migration
{
    public function up(){
   
        
        $this->schema->table('antennes_sites',function(Blueprint $table){
            $table->string('adress');
        });
    }
    public function down(){
      
        $this->schema->table('antennes_sites',function(Blueprint $table){
            
        });
    }
   
}
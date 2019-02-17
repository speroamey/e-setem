<?php
namespace App\Models;
 
class PersonnesRessources extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'last_name',
        'first_name',
        'fonctions',
        'entreprise',
        'contact'
    ];
}


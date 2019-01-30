<?php
namespace App\Models;
 
class Affiliation extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'nom_association',
        'start_date',
        'end_date',
        'objet',
    ];
}


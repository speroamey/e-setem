<?php
namespace App\Models;
 
class Affiliations extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'nom_association',
        'start_date',
        'end_date',
        'objet',
    ];
}


<?php
namespace App\Models;
 
class PersonnesRessources extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'start_date',
        'end_date',
        'nom_employeur',
        'fonction',
        'pays',
        'resume'
    ];
}


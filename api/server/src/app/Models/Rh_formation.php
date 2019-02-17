<?php
namespace App\Models;
 
class Formations extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'ecole',
        'user_id',
        'start_date',
        'end_date',
        'description',
        'diplome',
        'domaine'
    ];
}


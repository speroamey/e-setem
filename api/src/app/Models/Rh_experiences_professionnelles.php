<?php
namespace App\Models;
 
class ExperiencesProfessionnelles extends \Illuminate\Database\Eloquent\Model {  
    
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


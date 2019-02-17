<?php
namespace App\Models;
 
class ExperiencesProfessionnelles extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'start_date',
        'end_date',
        'nom_employeur',
        'fonctions',
        'pays',
        'resume'
    ];
}


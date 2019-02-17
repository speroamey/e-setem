<?php
namespace App\Models;
 
class Aptitudes extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'aptitude',
        'user_id'
    ];
}

class CompetencesBranchesAptitudes extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'aptitude_id',
        'competence_id',
        'branche_id'
    ];
}


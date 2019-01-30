<?php
namespace App\Models;
 
class TypeImmobiliers extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle'
    ];
}



class Categories extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
    ];
}


class Immobiliers extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
        'date_acquisition',
        'date_amortissement',   
        'description',
        'num_plaque',
        'num_chassis',
        'marque',
        'nbr_place'
    ];
}

class PositionsImmobiliere extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'date_prise',
        'date_retour',
        'personnel'
    ];
}




class AssurancesImmobiliere extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'assureur',
        'date_debut',
        'date_expiration'
    ];
}
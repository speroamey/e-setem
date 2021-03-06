<?php
namespace App\Models;
 
class PiecesAdministratives extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'libelle',
        'numero',
        'pays',
        'lieu',
        'validite',
        'expiration_date'
    ];
}



class Competences extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
    ];

    public function branche(){
        return $this->hasMany(Branches::class);
    }
}


class Branches extends \Illuminate\Database\Eloquent\Model {  
    protected $fillable=[
        'competence_id',
        'code',
        'libelle',
    ];

    public function competence()
    {
        return $this->belongsTo(Competences::class);
    }
}




class Fonctions extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
    ];
}


class DepartementsServices extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
    ];
}

class AntennesSites extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
        'adress'
    ];
}


class ModelesCv extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'libelle'
    ];
}

class Systemes extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'expiration_cin',
        'expiration_passport',
        'expiration_pieces_administratives',
        'prise_immobilisation',
        'expiration_assurances',
        'expiration_visite_technique',
        'offre_manifestation_d_interet',
        'rapports',
        'echeance_paiements'
    ];
}
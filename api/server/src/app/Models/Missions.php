<?php
namespace App\Models;
 
class Missions extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'numero_missions',
        'date_departs',
        'date_arrive_prevus',
        'cadres',
        'objets',
        'id_chef_missions'
    ];
}



class RessourcesMissions extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'id_personnels',
        'id_missions',
        'id_immobiliers'
    ];
}


class OrdreMissions extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'code',
        'libelle',
    ];
}
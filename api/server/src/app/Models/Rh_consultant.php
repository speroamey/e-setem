<?php
namespace App\Models;
 
class PersonnelsEtConsultants extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'num_ifu',
        'nom_prenoms',
        'date_naissance',
        'date_embauche',
        'antennes_sites',
        'departements_services',
        'type_collaborateur',
        'fonctions',
        'num_cin',
        'expiration_cin',
        'num_passport',
        'expiration_passport',
        'anciennete',
        'categorie',
        'num_tel',
        'address',
        'nationnalite',
        'num_permis',
        'categorie_permis'
    ];
}



class DocumentsConsultants extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'types_documents',
        'libelle',
        'modeles'
    ];
}


class Identity extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'last_name',
        'first_name',
        'phone',
        'titre',
        'address',
        'sexe',
        'birthday',
        'email'
    ];
}


class FichePaiements extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'date_debut',
        'date_fin',
        'montant_percu'
    ];
}

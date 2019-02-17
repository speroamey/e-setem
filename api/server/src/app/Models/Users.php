<?php  
namespace App\Models;
 
class Users extends \Illuminate\Database\Eloquent\Model {  
    protected $table = 'users';
    protected $fillable=[
        'username',
        'password',
        'roles',
        'last_name',
        'first_name',
        'phone',
        'titre',
        'address',
        'sexe',
        'birthday',
        'email',
        'type',
        'conjoint',
        'ifu',
        'anciennete',
        'categorie',
        'nationalite'
    ];
}
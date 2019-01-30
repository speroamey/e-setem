<?php  
namespace App\Models;
 
class Users extends \Illuminate\Database\Eloquent\Model {  
    protected $table = 'users';
    protected $fillable=[
        'username',
        'password',
        'email',
        'roles',
        'address'
    ];
}
<?php
namespace App\Models;
 
class OutilsInformatiques extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'nom',
        'type',
        'niveau',
    ];
}


<?php
namespace App\Models;
 
class Langues extends \Illuminate\Database\Eloquent\Model {  
    
    protected $fillable=[
        'user_id',
        'langue',
        'lecture',
        'parle',
        'ecriture',
    ];
}


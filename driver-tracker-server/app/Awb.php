<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Awb extends Model
{
    protected $table = 'awb';
    protected $primaryKey = "ID";
    protected $fillable = [
        'AWB_Status',
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Awb extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'awb';
    protected $primaryKey = 'ID';
    protected $fillable = [
        'AWB_Status',
        'AWB_Date',
        'AWB_Img'
    ];
}

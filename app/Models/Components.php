<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
class Components extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'components';
    protected $fillable = [
        'type', 'banner_depth','data','carousel','product_in_rows','description',"landing_page_id","position"
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class LandingPage extends Model {
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'landingpage';
    protected $fillable = [
        'name', 'description','slug','use_for_page','create_date','api','start_time','end_time','status'
    ];
    protected $dates = ['created_at', 'updated_at', 'start_time','end_time'];
}

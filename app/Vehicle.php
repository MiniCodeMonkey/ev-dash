<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'tesla_id',
        'name',
        'vin',
        'option_codes'
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function chargeLogs() {
        return $this->hasMany(LogCharge::class);
    }

    public function climateLogs() {
        return $this->hasMany(LogClimate::class);
    }

    public function drivingLogs() {
        return $this->hasMany(LogDriving::class);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
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

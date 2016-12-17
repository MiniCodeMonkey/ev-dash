<?php

namespace App;

use Illuminate\Notifications\Notifiable;
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
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogDriving extends Model
{
	public $table = 'log_driving';
	
	public $fillable = [
		'vehicle_id',
		'shift_state',
		'speed',
		'latitude',
		'longitude',
		'heading',
		'gps_as_of',
	];

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogClimate extends Model
{
	public $table = 'log_climate';

	public $fillable = [
		'vehicle_id',
		'inside_temp',
		'outside_temp',
		'driver_temp_setting',
		'passenger_temp_setting',
		'left_temp_direction',
		'right_temp_direction',
		'is_auto_conditioning_on',
		'is_front_defroster_on',
		'is_rear_defroster_on',
		'fan_status',
		'is_climate_on',
		'min_avail_temp',
		'max_avail_temp',
		'seat_heater_left',
		'seat_heater_right',
		'seat_heater_rear_left',
		'seat_heater_rear_right',
		'seat_heater_rear_center',
		'seat_heater_rear_right_back',
		'seat_heater_rear_left_back',
		'smart_preconditioning',
	];

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }
}

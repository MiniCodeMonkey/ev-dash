<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogCharge extends Model
{
	public $table = 'log_charge';

	public $fillable = [
		'vehicle_id',
		'charging_state',
		'charge_limit_soc',
		'charge_limit_soc_std',
		'charge_limit_soc_min',
		'charge_limit_soc_max',
		'charge_to_max_range',
		'battery_heater_on',
		'not_enough_power_to_heat',
		'max_range_charge_counter',
		'fast_charger_present',
		'fast_charger_type',
		'battery_range',
		'est_battery_range',
		'ideal_battery_range',
		'battery_level',
		'usable_battery_level',
		'battery_current',
		'charge_energy_added',
		'charge_miles_added_rated',
		'charge_miles_added_ideal',
		'charger_voltage',
		'charger_pilot_current',
		'charger_actual_current',
		'charger_power',
		'time_to_full_charge',
		'trip_charging',
		'charge_rate',
		'charge_port_door_open',
		'motorized_charge_port',
		'scheduled_charging_start_time',
		'scheduled_charging_pending',
		'user_charge_enable_request',
		'charge_enable_request',
		'eu_vehicle',
		'charger_phases',
		'charge_port_latch',
		'charge_current_request',
		'charge_current_request_max',
		'managed_charging_active',
		'managed_charging_user_canceled',
		'managed_charging_start_time',
	];

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }
}

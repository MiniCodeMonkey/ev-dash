<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogChargeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_charge', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('vehicle_id')->unsigned();
            $table->foreign('vehicle_id')->references('id')->on('vehicles');
            $table->string('charging_state')->nullable();
            $table->integer('charge_limit_soc')->nullable();
            $table->integer('charge_limit_soc_std')->nullable();
            $table->integer('charge_limit_soc_min')->nullable();
            $table->integer('charge_limit_soc_max')->nullable();
            $table->boolean('charge_to_max_range')->nullable();
            $table->boolean('battery_heater_on')->nullable();
            $table->boolean('not_enough_power_to_heat')->nullable();
            $table->integer('max_range_charge_counter')->nullable();
            $table->boolean('fast_charger_present')->nullable();
            $table->string('fast_charger_type')->nullable();
            $table->decimal('battery_range', 5, 2)->nullable();
            $table->decimal('est_battery_range', 5, 2)->nullable();
            $table->decimal('ideal_battery_range', 5, 2)->nullable();
            $table->integer('battery_level')->nullable();
            $table->integer('usable_battery_level')->nullable();
            $table->decimal('battery_current', 5, 2)->nullable();
            $table->decimal('charge_energy_added', 5, 2)->nullable();
            $table->decimal('charge_miles_added_rated', 5, 2)->nullable();
            $table->decimal('charge_miles_added_ideal', 5, 2)->nullable();
            $table->integer('charger_voltage')->nullable();
            $table->integer('charger_pilot_current')->nullable();
            $table->integer('charger_actual_current')->nullable();
            $table->integer('charger_power')->nullable();
            $table->decimal('time_to_full_charge', 5, 2)->nullable();
            $table->boolean('trip_charging')->nullable();
            $table->decimal('charge_rate', 5, 2)->nullable();
            $table->boolean('charge_port_door_open')->nullable();
            $table->boolean('motorized_charge_port')->nullable();
            $table->string('scheduled_charging_start_time')->nullable();
            $table->boolean('scheduled_charging_pending')->nullable();
            $table->string('user_charge_enable_request')->nullable();
            $table->boolean('charge_enable_request')->nullable();
            $table->boolean('eu_vehicle')->nullable();
            $table->string('charger_phases')->nullable();
            $table->string('charge_port_latch')->nullable();
            $table->integer('charge_current_request')->nullable();
            $table->integer('charge_current_request_max')->nullable();
            $table->boolean('managed_charging_active')->nullable();
            $table->boolean('managed_charging_user_canceled')->nullable();
            $table->string('managed_charging_start_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_charge');
    }
}

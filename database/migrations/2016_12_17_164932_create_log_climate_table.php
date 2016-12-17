<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogClimateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_climate', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('vehicle_id')->unsigned();
            $table->foreign('vehicle_id')->references('id')->on('vehicles');
            $table->decimal('inside_temp', 4, 1)->nullable();
            $table->decimal('outside_temp', 4, 1)->nullable();
            $table->decimal('driver_temp_setting', 4, 1)->nullable();
            $table->decimal('passenger_temp_setting', 4, 1)->nullable();
            $table->decimal('left_temp_direction', 4, 1)->nullable();
            $table->decimal('right_temp_direction', 4, 1)->nullable();
            $table->boolean('is_auto_conditioning_on')->nullable();
            $table->boolean('is_front_defroster_on')->nullable();
            $table->boolean('is_rear_defroster_on')->nullable();
            $table->integer('fan_status')->nullable();
            $table->boolean('is_climate_on')->nullable();
            $table->decimal('min_avail_temp', 4, 1)->nullable();
            $table->decimal('max_avail_temp', 4, 1)->nullable();
            $table->integer('seat_heater_left')->nullable();
            $table->integer('seat_heater_right')->nullable();
            $table->integer('seat_heater_rear_left')->nullable();
            $table->integer('seat_heater_rear_right')->nullable();
            $table->integer('seat_heater_rear_center')->nullable();
            $table->integer('seat_heater_rear_right_back')->nullable();
            $table->integer('seat_heater_rear_left_back')->nullable();
            $table->boolean('smart_preconditioning')->nullable();
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
        Schema::dropIfExists('log_climate');
    }
}

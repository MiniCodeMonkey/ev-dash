<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Vehicle::class, function (Faker\Generator $faker) {
    return [
        'tesla_id' => 12345,
        'name' => $faker->name,
        'vin' => 'ABC123',
        'option_codes' => ''
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\LogCharge::class, function (Faker\Generator $faker) {
    return [
        'charging_state' => 'Disconnected',
        'charge_limit_soc' => 90
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\LogClimate::class, function (Faker\Generator $faker) {
    return [
        'inside_temp' => 12.34,
        'fan_status' => 4
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\LogDriving::class, function (Faker\Generator $faker) {
    return [
        'shift_state' => 'D',
        'speed' => 10,
        'latitude' => 38.5,
        'longitude' => -77.10,
        'heading' => 180
    ];
});

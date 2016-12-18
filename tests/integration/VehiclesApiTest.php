<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;

class VehiclesApiTest extends TestCase
{
    public function testRefresh() {
        $user = User::find(1);

        $this->actingAs($user)
             ->json('POST', '/api/v1/vehicles')
             ->seeJson(['id' => 1, 'name' => 'Marvin']);
    }

    public function testList() {
        $user = User::find(1);

        $this->actingAs($user)
             ->json('GET', '/api/v1/vehicles')
             ->seeJson(['id' => 1, 'name' => 'Marvin']);
    }

    public function testCurrent() {
        $user = factory(App\User::class)->create();
        $vehicle = factory(App\Vehicle::class)->create(['user_id' => $user->id]);
        $charge = factory(App\LogCharge::class)->create(['vehicle_id' => $vehicle->id]);
        $climate = factory(App\LogClimate::class)->create(['vehicle_id' => $vehicle->id]);
        $driving = factory(App\LogDriving::class)->create(['vehicle_id' => $vehicle->id]);

        $this->actingAs($user)
             ->json('GET', '/api/v1/vehicles/' . $vehicle->id . '/current')
             ->seeJsonStructure([
                'charge' => ['charging_state', 'charge_limit_soc'],
                'climate' => ['inside_temp', 'fan_status'],
                'driving' => ['shift_state', 'speed', 'latitude', 'longitude', 'heading'],
            ]);
    }
}

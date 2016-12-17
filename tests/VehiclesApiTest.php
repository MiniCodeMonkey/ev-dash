<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VehiclesApiTest extends TestCase
{
    public function testRefresh() {
        $user = factory(App\User::class)->create();

        $this->actingAs($user)
             ->json('POST', '/api/v1/vehicles')
             ->seeJsonEquals(['success' => true]);

        $this->assertNotNull($user->tesla_access_token);
    }

    public function testList() {
        $user = factory(App\User::class)->create([
            'tesla_access_token' => 'abc123'
        ]);

        $this->actingAs($user)
             ->json('GET', '/api/v1/vehicles')
             ->seeJsonEquals(['success' => true]);

        $this->assertNull($user->tesla_access_token);
    }
}

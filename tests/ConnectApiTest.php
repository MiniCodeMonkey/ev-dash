<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ConnectApiTest extends TestCase
{
    public function testConnection() {
        $user = factory(App\User::class)->create();

        $parameters = [
            'email' => env('TESLA_ACCOUNT_EMAIL'),
            'password' => env('TESLA_ACCOUNT_PASSWORD')
        ];

        $this->actingAs($user)
             ->json('POST', '/api/v1/connect/tesla', $parameters)
             ->seeJsonEquals(['success' => true]);

        $this->assertNotNull($user->tesla_access_token);
    }

    public function testDisconnect() {
        $user = factory(App\User::class)->create([
            'tesla_access_token' => 'abc123'
        ]);

        $this->actingAs($user)
             ->json('DELETE', '/api/v1/connect/tesla')
             ->seeJsonEquals(['success' => true]);

        $this->assertNull($user->tesla_access_token);
    }
}

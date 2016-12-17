<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

class AppController extends Controller
{
    public function render(Request $request) {
        $user = $request->user();
        $firstVehicle = $user->vehicles()->first();

        $initialState = [
            'user' => [
                'email' => $user->email,
                'name' => $user->name,
                'hasValidAccessToken' => $user->tesla_access_token !== null
            ],
            'vehicles' => [
                'vehicles' => $user->vehicles,
                'isLoading' => false,
                'selectedVehicleId' => $firstVehicle ? $firstVehicle->id : null
            ]
        ];

        return view('app', ['initialState' => $initialState]);
    }

}

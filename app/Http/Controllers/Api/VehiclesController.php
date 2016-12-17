<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\TeslaClient;
use App\Vehicle;
use Exception;

class VehiclesController extends Controller
{
    public function refresh(Request $request) {
        $accessToken = $request->user()->tesla_access_token;

        if (!$accessToken) {
            abort(401);
        }

        $client = new TeslaClient($accessToken);

        try {
            $response = $client->listVehicles();

            $user = $request->user();
            $user->vehicles()->delete();

            foreach ($response->response as $entry) {
                $vehicle = new Vehicle();
                $vehicle->tesla_id = $entry->id_s;
                $vehicle->name = $entry->display_name;
                $vehicle->vin = $entry->vin;
                $vehicle->option_codes = $entry->option_codes;
                $user->vehicles()->save($vehicle);
            }

            return $this->list($request);
        } catch (Exception $e) {
            info('VehiclesController@refresh error: ' . $e->getMessage());

            return response()->json(['success' => false]);
        }
    }

    public function list(Request $request) {
        return $request->user()->vehicles;
    }

}

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

            $teslaIds = collect($response)->map(function ($vehicle) {
                return $vehicle->id_s;
            })->all();

            $user->vehicles()->whereNotIn('tesla_id', $teslaIds)->delete();

            foreach ($response as $entry) {
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

    public function current(Request $request) {
        return $request->user()->vehicles->map(function (Vehicle $vehicle) {
            return [
                'id' => $vehicle->id,
                'charge' => $vehicle->chargeLogs()->orderBy('created_at', 'DESC')->take(10)->get(),
                'climate' => $vehicle->climateLogs()->orderBy('created_at', 'DESC')->take(10)->get(),
                'driving' => $vehicle->drivingLogs()->orderBy('created_at', 'DESC')->take(10)->get()
            ];
        });
    }

}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\TeslaClient;
use App\Vehicle;
use Exception;

class AchievementsController extends Controller
{
    public function list(Request $request) {
        return $request->user()->vehicles->map(function (Vehicle $vehicle) {
            $achievements = collect([
                $this->formatFastestCharge(),
                $this->formatColdestOutside(),
                $this->formatWarmestOutside(),
            ])->filter();

            return [
                'id' => $vehicle->id,
                'achievements' => $achievements->all()
            ];
        });
    }

    private function formatFastestCharge(Vehicle $vehicle) {
        $entry = $vehicle->chargeLogs()
            ->where('charging_state', 'Charging')
            ->orderBy('charge_power', 'DESC')
            ->first();

        if ($entry) {
            return [
                $entry->fast_charger_type, // Tesla or unknown
                $entry->battery_level, // %
                $entry->battery_current, // A
                $entry->charge_power, // kW
                $entry->charge_voltage, // V
                $entry->charge_rate, // mi/hour
            ];
        }

        return null;
    }

    private function formatColdestOutside(Vehicle $vehicle) {
        $entry = $vehicle->climateLogs()
            ->whereNotNull('outside_temp')
            ->orderBy('outside_temp', 'ASC')
            ->first();

        if ($entry) {
            return [
                $entry->outside_temp, // Celcius
                $entry->inside_temp // Celcius
            ];
        }

        return null;
    }

    private function formatWarmestOutside(Vehicle $vehicle) {
        $entry = $vehicle->climateLogs()
            ->whereNotNull('outside_temp')
            ->orderBy('outside_temp', 'DESC')
            ->first();

        if ($entry) {
            return [
                $entry->outside_temp, // Celcius
                $entry->inside_temp // Celcius
            ];
        }

        return null;
    }

    private function formatAchievement($value, $location, $description) {
        
    }

}


/*
* Longest trip in a day
* Fastest charge
* Coldest day
* Warmest day
* Most miles added in a charging session
* Furthest away from home
*/
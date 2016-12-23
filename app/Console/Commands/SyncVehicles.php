<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\TeslaClient;
use App\Vehicle;
use App\LogCharge;
use App\LogClimate;
use App\LogDriving;
use Exception;
use Ramsey\Uuid\Uuid;

class SyncVehicles extends Command
{
    const SLOW_POLLING_INTERVAL_SECONDS = 60*4;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ev:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronizes all available vehicles';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $vehicles = Vehicle::all();

        foreach ($vehicles as $vehicle) {
            $user = $vehicle->owner;

            if (!$user->tesla_access_token) {
                continue;
            }

            if ($this->shouldSkipDataCollection($vehicle)) {
                continue;
            }

            $client = new TeslaClient($user->tesla_access_token);

            $vehicleData = collect($client->listVehicles())->where('id_s', $vehicle->tesla_id)->first();

            if (!$vehicleData) {
                $vehicle->delete();
            } elseif ($vehicleData->state !== 'online') {
                info('Vehicle #' . $vehicle->id . ': State is ' . $vehicleData->state);
            } else {
                info('Vehicle #' . $vehicle->id . ': Syncing');
                $groupId = $this->generateGroupId();
                $this->syncChargeState($vehicle, $client, $groupId);
                $this->syncClimateState($vehicle, $client, $groupId);
                $this->syncDriveState($vehicle, $client, $groupId);
            }
        }
    }

    private function shouldSkipDataCollection(Vehicle $vehicle) {
        $lastDrivingState = $vehicle->drivingLogs()->orderBy('created_at', 'DESC')->first();
        $lastChargingState = $vehicle->chargeLogs()->orderBy('created_at', 'DESC')->first();

        if ($lastDrivingState && $lastChargingState) {
            $isDriving = $lastDrivingState->shift_state === 'D';
            $isCharging = $lastChargingState->charging_state === 'Charging';
            $alreadyUpdatedRecently = $lastDrivingState->created_at->diffInSeconds() < self::SLOW_POLLING_INTERVAL_SECONDS;
            
            if (!$isDriving && !$isCharging && $alreadyUpdatedRecently) {
                return true;
            }
        }

        return false;
    }

    private function generateGroupId() {
        return Uuid::uuid4();
    }

    private function syncChargeState(Vehicle $vehicle, TeslaClient $client, string $groupId) {
        try {
            $state = $client->getChargeState($vehicle->tesla_id);
            $log = new LogCharge((array)$state);
            $log->group_id = $groupId;
            $vehicle->chargeLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get charge logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }

    private function syncClimateState(Vehicle $vehicle, TeslaClient $client, string $groupId) {
        try {
            $state = $client->getClimateState($vehicle->tesla_id);
            $log = new LogClimate((array)$state);
            $log->group_id = $groupId;
            $vehicle->climateLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get climate logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }

    private function syncDriveState(Vehicle $vehicle, TeslaClient $client, string $groupId) {
        try {
            $state = $client->getDriveState($vehicle->tesla_id);
            $log = new LogDriving((array)$state);
            $log->group_id = $groupId;
            $vehicle->drivingLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get driving logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\TeslaClient;
use App\Vehicle;
use App\LogCharge;
use App\LogClimate;
use App\LogDriving;
use Exception;

class SyncVehicles extends Command
{
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

            if ($user->tesla_access_token) {
                $client = new TeslaClient($user->tesla_access_token);

                $this->syncChargeState($vehicle, $client);
                $this->syncClimateState($vehicle, $client);
                $this->syncDriveState($vehicle, $client);
            }
        }
    }

    private function syncChargeState(Vehicle $vehicle, TeslaClient $client) {
        try {
            $state = $client->getChargeState($vehicle->tesla_id);
            $log = new LogCharge((array)$state);
            $vehicle->chargeLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get charge logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }

    private function syncClimateState(Vehicle $vehicle, TeslaClient $client) {
        try {
            $state = $client->getClimateState($vehicle->tesla_id);
            $log = new LogClimate((array)$state);
            $vehicle->climateLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get climate logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }

    private function syncDriveState(Vehicle $vehicle, TeslaClient $client) {
        try {
            $state = $client->getDriveState($vehicle->tesla_id);
            $log = new LogDriving((array)$state);
            $vehicle->drivingLogs()->save($log);
        } catch (Exception $e) {
            info('Could not get driving logs for ' . $vehicle->tesla_id . ': ' . $e->getMessage());
        }
    }
}

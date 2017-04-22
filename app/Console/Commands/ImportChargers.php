<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Charger;

class ImportChargers extends Command
{
    const CHARGERS_URL = 'https://supercharge.info/service/supercharge/allSites';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ev:import:chargers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports charging locations';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $chargers = $this->downloadChargers();
        $this->saveChargers($chargers);
    }

    private function downloadChargers() {
        $chargers = file_get_contents(self::CHARGERS_URL);

        return json_decode($chargers);
    }

    private function saveChargers(array $chargers) {
        foreach ($chargers as $source) {
            $charger = Charger::updateOrCreate(['source_id' => $source->id], [
                'name' => $source->name,
                'status' => $source->status,
                'source_id' => $source->id,
                'street' => $source->address->street,
                'city' => $source->address->city,
                'state' => $source->address->state,
                'zip' => $source->address->zip,
                'country' => $source->address->country,
                'region' => $source->address->region,
                'latitude' => $source->gps->latitude,
                'longitude' => $source->gps->longitude,
                'elevation' => $source->elevationMeters,
                'stall_count' => $source->stallCount,
            ]);
        }
    }
}

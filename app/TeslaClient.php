<?php

namespace App;

use GuzzleHttp\Client;
use RuntimeException;

class TeslaClient
{
    const BASE_URL = 'https://owner-api.teslamotors.com/api/1/';

    protected $accessToken;
    protected $client;

    public function __construct($accessToken = null) {
        $this->accessToken = $accessToken;
        $this->client = $this->createClient();
    }

    public function listVehicles() {
        return $this->handleResponse($this->client->get('vehicles'));
    }

    public function getChargeState($vehicleId) {
        return $this->handleResponse($this->client->get('vehicles/' . $vehicleId . '/data_request/charge_state'));
    }

    public function getClimateState($vehicleId) {
        return $this->handleResponse($this->client->get('vehicles/' . $vehicleId . '/data_request/climate_state'));
    }

    public function getDriveState($vehicleId) {
        return $this->handleResponse($this->client->get('vehicles/' . $vehicleId . '/data_request/drive_state'));
    }

    public function getGuiSettings($vehicleId) {
        return $this->handleResponse($this->client->get('vehicles/' . $vehicleId . '/data_request/gui_settings'));
    }

    public function getVehicleState($vehicleId) {
        return $this->handleResponse($this->client->get('vehicles/' . $vehicleId . '/data_request/vehicle_state'));
    }

    private function handleResponse($response) {
        if ($response->getStatusCode() === 200) {
            $result = json_decode($response->getBody());

            return $result->response;
        } else {
            throw new RuntimeException($response->getStatusCode() . ' ' . $response->getReasonPhrase());
        }
    }

    private function createClient() {
        $client = new Client([
            'timeout' => 10.0,
            'base_uri' => self::BASE_URL,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->accessToken
            ]
        ]);

        return $client;
    }

}
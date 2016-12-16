<?php

namespace App;

use GuzzleHttp\Client;
use RuntimeException;

class TeslaAuthenticator
{
    // Client id/secret from taken from http://pastebin.com/fX6ejAHd
    const CLIENT_ID = 'e4a9949fcfa04068f59abb5a658f2bac0a3428e4652315490b659d5ab3f35a9e';
    const CLIENT_SECRET = 'c75f14bbadc8bee3a7594412c31416f8300256d7668ea7e6e7f06727bfb9d220';

    const OAUTH_URL = 'https://owner-api.teslamotors.com/oauth/token';

    private $email;
    private $password;

    public function __construct($email, $password) {
        $this->email = $email;
        $this->password = $password;
    }

    public function authenticate() {
        $client = $this->createClient();

        $response = $client->post(self::OAUTH_URL, [
            'form_params' => $this->buildAuthParameters()
        ]);

        return $this->handleResponse($response);
    }

    private function createClient() {
        $client = new Client([
            'timeout' => 2.0,
        ]);

        return $client;
    }

    private function buildAuthParameters() {
        return [
            'grant_type' => 'password',
            'client_id' => self::CLIENT_ID,
            'client_secret' => self::CLIENT_SECRET,
            'email' => $this->email,
            'password' => $this->password
        ];
    }

    private function handleResponse($response) {
        if ($response->getStatusCode() === 200) {
            $json = json_decode($response->getBody());
            return $json->access_token;
        } else {
            throw new RuntimeException($response->getStatusCode() . ' ' . $response->getReasonPhrase());
        }
    }

}
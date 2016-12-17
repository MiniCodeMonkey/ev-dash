<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\TeslaAuthenticator;
use App\Http\Controllers\Controller;
use Exception;

class ConnectController extends Controller
{
    public function connectTesla(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $authenticator = new TeslaAuthenticator($request->input('email'), $request->input('password'));

        try {
            $token = $authenticator->authenticate();

            $user = $request->user();
            $user->tesla_access_token = $token;
            $user->save();

            return response()->json(['success' => true]);
        } catch (Exception $e) {
            info('ConnectController@connectTesla error: ' . $e->getMessage());

            return response()->json(['success' => false]);
        }
    }

    public function disconnectTesla(Request $request) {
        $user = $request->user();
        $user->tesla_access_token = null;
        $user->save();

        return response()->json(['success' => true]);
    }

}

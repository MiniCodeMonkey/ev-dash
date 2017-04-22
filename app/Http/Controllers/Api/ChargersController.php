<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Charger;

class ChargersController extends Controller
{
    public function list(Request $request) {
        return Charger::where('status', 'OPEN')->where('country', 'USA')->get();
    }
}

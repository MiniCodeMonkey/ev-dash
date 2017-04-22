<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware' => 'auth'], function () {
	Route::post('api/v1/connect/tesla', 'Api\ConnectController@connectTesla');
	Route::delete('api/v1/connect/tesla', 'Api\ConnectController@disconnectTesla');
	Route::get('api/v1/vehicles', 'Api\VehiclesController@list');
	Route::post('api/v1/vehicles', 'Api\VehiclesController@refresh');
	Route::get('api/v1/vehicles/current', 'Api\VehiclesController@current');
});

// Unathenticated API routes
Route::get('api/v1/chargers', 'Api\ChargersController@list');

// Let React handle everything else
Route::any('{anything?}', 'AppController@render');

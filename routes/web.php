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

Route::group(['middleware' => 'auth'], function () {

	Route::post('api/v1/connect/tesla', 'Api\ConnectController@connectTesla');
	Route::delete('api/v1/connect/tesla', 'Api\ConnectController@disconnectTesla');

	// Let React handle the routing
	Route::any('{anything?}', function () {
		return view('app');
	});
});

Route::get('/', function () {
    return view('landing');
});

Auth::routes();

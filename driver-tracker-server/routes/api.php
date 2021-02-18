<?php

use Illuminate\Http\Request;

Route::group([
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'Api\AuthController@login');
    Route::post('check-phone', 'Api\AuthController@checkPhone');
    Route::post('create-password', 'Api\AuthController@createPassword');
    Route::get('logout', 'Api\AuthController@logout');
    Route::get('refresh', 'Api\AuthController@refresh');
    Route::get('me', 'Api\AuthController@me');
});

Route::group([
    'prefix' => 'v1'
], function ($router) {
    Route::post('jobs', 'Api\JobsController@getJobs');
    Route::post('jobs-today', 'Api\JobsController@getJobsToday');
});

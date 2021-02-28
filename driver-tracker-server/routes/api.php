<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
    Route::post('jobs-attemp', 'Api\JobsController@getAttempJobs');
    Route::post('jobs-today', 'Api\JobsController@getJobsToday');
    Route::post('jobs-active', 'Api\JobsController@getJobsActive');
    Route::post('jobs-failed', 'Api\JobsController@getFailedJobs');
    Route::post('jobs-canceled', 'Api\JobsController@getCanceledJobs');
    Route::post('job-send-status', 'Api\JobsController@setJobStatus');
    Route::post('job-send-status-activation', 'Api\JobsController@setJobStatusActivation');
    Route::post('upload-document', 'Api\JobsController@uploadDocument');

    Route::get('images/{filename}', function ($filename)
    {
        $path = public_path('document/' . $filename);
        
        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    });
});

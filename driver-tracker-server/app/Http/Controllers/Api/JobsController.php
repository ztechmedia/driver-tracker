<?php

namespace App\Http\Controllers\Api;

use App\Awb;
use App\Http\Controllers\Controller;
use App\Http\Resources\AwbResource;
use Illuminate\Http\Request;

class JobsController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt');
    }

    public function getJobs(Request $request)
    {
        $date = explode("-", date('Y-m-d', strtotime($request->date)));
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ['PROCESSED2', 'PROCESSED'])
            ->whereYear('AWB_Date', $date[0])
            ->whereMonth('AWB_Date', $date[1])
            ->get();

        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    public function getJobsToday(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ['PROCESSED2', 'PROCESSED'])
            ->where('AWB_Date', $date)
            ->get();
        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }
}

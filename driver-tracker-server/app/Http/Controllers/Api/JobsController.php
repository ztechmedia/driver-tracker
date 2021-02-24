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

    //get reschedule shipping
    public function getAttempJobs(Request $request)
    {
        $date = explode("-", date('Y-m-d', strtotime($request->date)));
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ["ATTEMP DELIVERY"])
            ->whereYear('AWB_Date', $date[0])
            ->whereMonth('AWB_Date', $date[1])
            ->get();

        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    //get schedule ready for shipping
    public function getJobsToday(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ['PROCESSED2', 'PROCESSED', "DELIVERY"])
            ->where('AWB_Date', $date)
            ->get();
        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    //get schedule active jobs
    public function getJobsActive(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ["DELIVERY", "RECEIVED", "DOCUMENT RECEIVED"])
            ->where('AWB_Date', $date)
            ->get();
        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    //get failed shipping
    public function getFailedJobs(Request $request)
    {
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ["FAILED DELIVERY"])
            ->whereYear('AWB_Date', $request->year)
            ->whereMonth('AWB_Date', $request->month)
            ->get();

        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    //get failed shipping
    public function getCanceledJobs(Request $request)
    {
        $jobs = Awb::where('Rider', $request->rider)
            ->whereIn('AWB_Status', ["CANCELED"])
            ->whereYear('AWB_Date', $request->year)
            ->whereMonth('AWB_Date', $request->month)
            ->get();

        $awb = count($jobs) > 0 ? AwbResource::collection($jobs) : [];
        return response()->json([
            'jobs' => $awb,
        ]);
    }

    //set status to delivery
    public function setJobStatus(Request $request)
    {
        $awb = Awb::where("ID", $request->id)->first();

        if(!$awb) {
            return response()->json(["error" => "AWB ID tidak ditemukan"]);
        }

        $awb->timestamps = false;
        $awb->AWB_Status = $request->status;
        $awb->update();

        return response()->json(["awb" => new AwbResource($awb)]);
    }

        //set status from attemp to delivery
        public function setJobStatusActivation(Request $request)
        {
            $awb = Awb::where("ID", $request->id)->first();
    
            if(!$awb) {
                return response()->json(["error" => "AWB ID tidak ditemukan"]);
            }
    
            $awb->timestamps = false;
            $awb->AWB_Status = $request->status;
            $awb->AWB_Date = $request->date;
            $awb->update();
    
            return response()->json(["awb" => new AwbResource($awb)]);
        }
}

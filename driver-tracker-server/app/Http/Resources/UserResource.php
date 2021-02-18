<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'Rider_ID' => $this->Rider_ID,
            'Rider_Name' => $this->Rider_Name,
            'Phone' => $this->Phone,
            'Status' => $this->Status,
            'Type_SIM' => $this->Type_SIM,
            'Status_Karyawan' => $this->Status_Karyawan
        ];
    }
}

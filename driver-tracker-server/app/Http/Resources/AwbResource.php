<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AwbResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'ID' => $this->ID,
            'AWB_No' => $this->AWB_No,
            'Account_Name' => $this->Account_Name,
            'Origin' => $this->Origin,
            'Destination' => $this->Destination,
            'Consignee_Name' => $this->Consignee_Name,
            'Consignee_Addr' => $this->Consignee_Addr,
            'AWB_Status' => $this->AWB_Status,
            'AWB_Date' => revDate($this->AWB_Date),
            'AWB_Img' => $this->AWB_Img,
        ];
    }
}

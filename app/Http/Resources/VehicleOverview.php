<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleOverview extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $last_location = $this->orders->last();
        $location = $last_location->location;
        $available = (Carbon::now() > $last_location->end_date);

        return [
            'id' => $this->id,
            'nomer' => $this->license,
            'merek' => $this->brand,
            'model' => $this->model,
            'muatan' => $this->load,
            'tahun' => $this->year,
            'servis' => $this->repair_date,
            'milik' => $this->owner,
            'available' => $available,
            'lokasi' =>$location,
        ];
    }
}

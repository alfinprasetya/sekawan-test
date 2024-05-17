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
            'license' => $this->license,
            'brand' => $this->brand,
            'model' => $this->model,
            'photo' => $this->photo,
            'load' => $this->load,
            'year' => $this->year,
            'repair_date' => $this->repair_date,
            'owner' => $this->owner,
            'available' => $available,
            'location' => [
                'id' => $location->id,
                'code' => $location->code,
                'name' => $location->name,
            ],
        ];
    }
}

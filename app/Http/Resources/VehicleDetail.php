<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleDetail extends JsonResource
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
            'load' => $this->load,
            'year' => $this->year,
            'repair_date' => $this->repair_date,
            'owner' => $this->owner,
            'available' => $available,
            'location' => new BranchOverview($location),
            'orders' => $this->orders,
            'fuels' => $this->fuels
        ];
    }
}

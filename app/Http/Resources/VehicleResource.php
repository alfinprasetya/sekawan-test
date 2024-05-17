<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nomer' => $this->license,
            'merek' => $this->brand,
            'model' => $this->model,
            'muatan' => $this->load,
            'tahun' => $this->year,
            'servis' => $this->repair_date,
            'milik' => $this->owner,
            'lokasi' => $this->orders->last()->location->name
        ];
    }
}

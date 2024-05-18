<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "invoice" => $this->invoice,
            "vehicle" => [
                'id' => $this->vehicle->id,
                'license' => $this->vehicle->license
            ],
            "date" => $this->date,
            "amount" => $this->amount,
            "invoice_path" => $this->invoice_path,
        ];
    }
}

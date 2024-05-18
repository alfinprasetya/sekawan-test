<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $approved = ($this->approved != 0);
        return [
            'id' => $this->id,
            'user' => $this->user->name,
            'vehicle' => $this->vehicle->license,
            'location' => $this->location->name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'approved' => $approved
        ];
    }
}

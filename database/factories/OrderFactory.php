<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'issuer_id' => random_int(1, 3),
            'vehicle_id' => random_int(1, 20),
            'location_id' => random_int(1, 8),
            'spv_approval' => true,
            'mgr_approval' => true,
        ];
    }
}

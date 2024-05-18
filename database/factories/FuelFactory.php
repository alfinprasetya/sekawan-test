<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fuel>
 */
class FuelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice' => $this->faker->vehicleRegistration('INV-[0-9]{8}'),
            'vehicle_id' => random_int(1, 20),
            'date' => fake()->dateTimeBetween('-6 months'),
            'amount' => random_int(100_000, 1_000_000),
            'invoice_path' => $this->faker->imageUrl(300, 500, word: "invoice"),
        ];
    }
}

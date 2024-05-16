<?php

namespace Database\Factories;

use Faker\Provider\FakeCar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->addProvider(new FakeCar($this->faker));

        return [
            'license' => $this->faker->vehicleRegistration('[A-Z]{1}-[0-9]{4}-[A-Z]{3}'),
            'brand' => $this->faker->vehicleBrand,
            'model' => $this->faker->vehicleType,
            'load' => fake()->randomElement(['people', 'stuff']),
            'year' => fake()->year(),
            'repair_date' => fake()->dateTimeBetween('-1 year'),
            'next_repair_date' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }
}

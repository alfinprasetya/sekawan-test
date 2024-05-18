<?php

namespace Database\Factories;

use App\Models\Branch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Branch>
 */
class BranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => 'C' . fake()->randomNumber(2, true),
            'name' => fake()->company(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->companyEmail(),
            'street' => fake()->streetAddress(),
            'city' => fake()->city(),
            'photo' => fake()->randomElement([getenv('APP_URL') . '/image/company.jpg', getenv('APP_URL') . '/image/company2.jpg']),
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Fuel;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\vehicle;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for ($x = 1; $x <= 3; $x++) {
            User::factory()->create([
                'name' => 'admin' . $x,
                'email' => 'admin' . $x . '@example.com',
                'role' => 'adm'
            ]);
        }

        User::factory()->create([
            'name' => 'supervisor',
            'email' => 'supervisor@example.com',
            'role' => 'spv'
        ]);

        User::factory()->create([
            'name' => 'manager',
            'email' => 'manager@example.com',
            'role' => 'mgr'
        ]);

        Branch::factory()->create([
            'code' => 'HO',
            'name' => 'head office'
        ]);

        Branch::factory()->create([
            'code' => 'BO',
            'name' => 'branch office'
        ]);

        for ($x = 1; $x <= 6; $x++) {
            Branch::factory()->create([
                'code' => 'C0' . $x,
                'name' => 'cabang 0' . $x,
            ]);
        }

        vehicle::factory()->count(20)->create();

        for ($x = 1; $x <= 20; $x++) {
            for ($i = 1; $i <= 6; $i++) {
                fuel::factory()->create([
                    'vehicle_id' => $x,
                    'date' => fake()->dateTimeInInterval('-' . $i.' months', '+1 month')
                ]);
            }
        }
    }
}

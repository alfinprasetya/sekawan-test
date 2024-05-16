<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'code' => 'C' . $x,
                'name' => 'cabang ' . $x,
            ]);
        }
    }
}

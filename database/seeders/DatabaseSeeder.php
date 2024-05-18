<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Fuel;
use App\Models\Order;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Vehicle;
use Carbon\Carbon;
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
            ]);
        }

        User::factory()->create([
            'name' => 'supervisor',
            'email' => 'supervisor@example.com',
            'can_approve' => true,
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

        Vehicle::factory()->count(20)->create();

        for ($x = 1; $x <= 20; $x++) {
            $new_start_date = null;
            for ($i = 1; $i <= 6; $i++) {
                fuel::factory()->create([
                    'vehicle_id' => $x,
                    'date' => fake()->dateTimeInInterval('-' . $i . ' months', '+1 month')
                ]);

                $start_date = ($new_start_date != null) ? $new_start_date : fake()->dateTimeInInterval('-6 months', '+2 weeks');
                $start_date->modify('+2 weeks');
                $end_date = fake()->dateTimeInInterval($start_date, '+1 months');

                $approval = ($start_date <= now());

                Order::factory()->create([
                    'vehicle_id' => $x,
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'approved' => $approval
                ]);

                $new_start_date = $end_date;
            }
        }


    }
}

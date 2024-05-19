<?php

namespace App\Http\Controllers;

use App\Models\Fuel;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $sixMonthsAgo = now()->subMonths(6);

        $fuels = Fuel::selectRaw('MONTH(date) AS month_number, MONTHNAME(date) AS month, YEAR(date) AS year, ROUND(SUM(amount) / 1000000, 3) AS "BBM dalam juta"')
            ->where('date', '>=', $sixMonthsAgo)
            ->groupBy('year', 'month_number', 'month')
            ->orderBy('year')
            ->orderBy(DB::raw('MONTH(date)'))
            ->get();

        $vehicles = [];
        for ($i = 0; $i < 7; $i++) {
            $sekarang = Carbon::now()->subDays($i);

            $active = Order::where('start_date', '<=', $sekarang)
                ->where('end_date', '>=', $sekarang->toDateString())
                ->distinct('vehicle_id')
                ->count('vehicle_id');

            $vehicles[] = [
                'hari' => $sekarang->format('d/m'),
                'Unit' => $active
            ];
        }

        return Inertia('Dashboard', [
            "fuels" => $fuels,
            'active_vehicles' => array_reverse($vehicles)
        ]);
    }
}

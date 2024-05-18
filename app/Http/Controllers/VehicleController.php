<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Carbon\Carbon;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $today = Carbon::now()->toDateString();
        $query = Vehicle::query();

        if (request("q")) {
            $query->where(function ($q) {
                $searchTerm = request('q');
                $q->where("brand", "like", "%" . $searchTerm . "%")
                    ->orWhere("license", "like", "%" . $searchTerm . "%")
                    ->orWhere("model", "like", "%" . $searchTerm . "%");
            });
        };
        if (request('load')) {
            $query->where("load", "like", "%" . request("load") . "%");
        }
        if (request('owner')) {
            $query->where("owner", "like", "%" . request("owner") . "%");
        }
        if (request('location')) {
            $query->whereHas('latestOrder', function ($query) {
                $query->where('location_id', '=', request('location'));
            });
        }
        if (request('status')) {
            if (request('status') == 'unavailable') {
                $query->whereHas('latestOrder', function ($sub) use ($today) {
                    $sub->whereDate('start_date', '<=', $today)
                        ->WhereDate('end_date', '>=', $today);
                });
            }
            if (request('status') == 'available') {
                $query->whereDoesntHave('latestOrder', function ($sub) use ($today) {
                    $sub->whereDate('start_date', '<=', $today)
                        ->WhereDate('end_date', '>=', $today);
                });
            }
        }

        $vehicles = $query->paginate(5)->onEachSide(1)->appends(request()->query());

        return inertia('Vehicle/VehicleOverview', [
            'vehicles' => VehicleResource::collection($vehicles),
            'initialQuery' => request()->query()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public
    function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public
    function store(StoreVehicleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public
    function show(Vehicle $vehicle)
    {
        return inertia('Vehicle/VehicleDetail', [
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public
    function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public
    function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(Vehicle $vehicle)
    {
        //
    }
}

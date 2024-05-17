<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleDetail;
use App\Http\Resources\VehicleOverview;
use App\Models\Order;
use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehicles = Vehicle::query()->paginate(5)->onEachSide(1);

        return inertia('Vehicle/VehicleLayout', [
            'vehicles' => VehicleOverview::collection($vehicles)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return inertia('Vehicle/VehicleLayout', [
            'vehicles' => new VehicleDetail($vehicle),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }
}

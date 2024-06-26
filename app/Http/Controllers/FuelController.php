<?php

namespace App\Http\Controllers;

use App\Http\Resources\FuelResource;
use App\Models\Fuel;
use App\Http\Requests\StoreFuelRequest;
use App\Http\Requests\UpdateFuelRequest;

class FuelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fuels = Fuel::query()->orderBy('date', 'desc')->paginate(10)->onEachSide(1);

        return inertia('Fuel/FuelLayout', [
            'fuels' => FuelResource::collection($fuels)
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
    public function store(StoreFuelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Fuel $fuel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fuel $fuel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFuelRequest $request, Fuel $fuel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fuel $fuel)
    {
        //
    }
}

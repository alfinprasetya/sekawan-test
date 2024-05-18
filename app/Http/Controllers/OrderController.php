<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderExport;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::query();
        $export = [];

        if (request('status') == 'pending') {
            $query->where('approved', 0);
        }
        if (request('status') == 'approved') {
            $query->where('approved', 1);
        }
        if (request('export') == 'true') {
            $export = $query->orderBy('id', 'desc')->get();
        }

        $queryParams = request()->query();
        unset($queryParams["export"]);

        $orders = $query->orderBy('created_at', 'desc')->orderBy('start_date', 'desc')->paginate(10)->onEachSide(1);

        return inertia('Order/OrderLayout', [
            'orders' => OrderResource::collection($orders),
            'initialQuery' => $queryParams,
            'success' => session('success'),
            'export_excel' => OrderExport::collection($export)
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
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $order = Order::create($data);

        return redirect()->route('order.index')->with('success', 'Pesanan berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data = $request->validated();
        $order->approved = $data['approved'];
        $order->save();

        return redirect()->route('order.index', request()->query())->with('success', 'Pesanan telah disetujui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        Order::destroy($order->id);

        return redirect()->route('order.index', request()->query())->with('success', 'Pesanan berhasil dihapus');
    }
}

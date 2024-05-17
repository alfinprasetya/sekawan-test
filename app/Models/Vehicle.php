<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    public function fuels(): HasMany
    {
        return $this->hasMany(Fuel::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}

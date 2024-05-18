<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->user()->can_approve == 0) {
            return true;
        };
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => ['required'],
            'location_id' => ['required', 'exists:branches,id'],
            'start_date' => ['required', 'date', 'after:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = redirect()->route('vehicle.show', ['vehicle' => request()->vehicle_id])
            ->withErrors($validator)
            ->withInput();

        throw new HttpResponseException($response);
    }
}

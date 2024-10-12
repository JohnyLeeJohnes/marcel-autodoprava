<?php

namespace App\Http\Requests;

class ContactRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name"    => "required|string|max:60",
            "email"   => "required|string|max:60",
            "message" => "required|string|max:2000",
        ];
    }
}
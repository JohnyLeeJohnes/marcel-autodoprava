<?php

namespace App\Support;

use Illuminate\Validation\Validator;

class FormRequest extends RequestInput
{
    /**
     * @var Validator $validator
     */
    protected $validator;

    public function validate(): void
    {
        $this->prepareForValidation();
        $this->validator = validator($this->all(), $this->rules(), $this->messages());

        if ($this->validator->fails()) {
            $this->afterValdationFails();
        }

        if ($this->validator->passes()) {
            $this->afterValdationPasses();
        }

        $this->afterValidation();
    }

    /**
     * Getter
     * @return Validator
     */
    public function getValidator(): Validator
    {
        return $this->validator;
    }

    /**
     * Validate if property is set -> after that validate bool
     * @param string $property
     * @param string|null $parent
     * @return bool|null
     */
    public function validateBool(string $property, ?string $parent = null): ?bool
    {
        if ($parent) {
            if (!isset($this->attributes[$parent][$property])) {
                return null;
            }
            return $this->attributes[$parent][$property] === "true";
        }
        if (!isset($this->attributes[$property])) {
            return null;
        }
        return $this->attributes[$property] === "true";
    }

    #region Control methods for validator
    public function failed(): bool
    {
        return $this->validator->fails();
    }

    public function messages(): array
    {
        return [];
    }

    public function rules(): array
    {
        return [];
    }
    #endregion

    #region Control methods during validation
    protected function prepareForValidation(): void
    {

    }

    protected function afterValdationFails(): void
    {

    }

    protected function afterValdationPasses(): void
    {

    }

    protected function afterValidation(): void
    {

    }

    #endregion
}
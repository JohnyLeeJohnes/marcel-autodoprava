<?php

namespace App\Support;

class RequestInput
{
    protected $meta;
    protected $attributes;
    protected $files;

    public function __construct($request, $route)
    {
        $this->meta = [
            "name"       => $route->getName(),
            "groups"     => $route->getGroups(),
            "methods"    => $route->getMethods(),
            "arguments"  => $route->getArguments(),
            "currentUri" => $request->getUri(),
        ];

        $this->attributes = $request->getParsedBody() ?? [];
        $this->files = $request->getUploadedFiles();
    }

    public function all(): array
    {
        return $this->attributes;
    }

    public function __set($name, $value)
    {
        $this->attributes[$name] = $value;
    }

    public function __get($name)
    {
        throw_when(!isset($this->attributes[$name]), "$name does not exist in the request");
        return $this->attributes[$name];
    }

    public function __isset($name)
    {
        return isset($this->attributes[$name]);
    }


    public function __invoke($name)
    {
        return data_get($this->attributes, $property);
    }

    public function forget($name): RequestInput
    {
        unset($this->attributes[$name]);
        return $this;
    }

    public function merge($array): RequestInput
    {
        array_walk($array, function ($value, $key) {
            data_set($this->attributes, $key, $value);
        });
        return $this;
    }

    public function fill($array): RequestInput
    {
        array_walk($array, function ($value, $key) {
            data_fill($this->attributes, $key, $value);
        });
        return $this;
    }

    public function getCurrentUri()
    {
        return data_get($this->meta, "currentUri");
    }

    public function getName()
    {
        return data_get($this->meta, "name");
    }

    public function getGroups()
    {
        return data_get($this->meta, "groups");
    }

    public function getMethods()
    {
        return data_get($this->meta, "methods");
    }

    public function getArguments()
    {
        return data_get($this->meta, "arguments");
    }

    public function getUploadedFiles(){
        return $this->files;
    }
}
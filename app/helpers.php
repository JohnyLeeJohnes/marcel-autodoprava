<?php

use Boot\Foundation\Http\Session;
use Boot\Foundation\Http\ValidatorFactory;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

if (!function_exists('session')) {
    function session($key = false, $value = false)
    {
        $session = app()->getContainer()->get(Session::class);
        if (!$key) {
            return $session;
        }
        if (!$value) {
            return $session->get($key);
        }
        $session->set($key, $value);
        return $session;
    }
}

if (!function_exists('validator')) {
    function validator(array $input, array $rules, array $message = [])
    {
        return app()->getContainer()->get(ValidatorFactory::class)->make($input, $rules, $message);
    }
}

if (!function_exists("app")) {
    function app()
    {
        return $_SERVER["app"] ?: null;
    }
}

if (!function_exists('env')) {
    function env($key, $default = false): bool
    {
        $value = getenv($key);
        throw_when(!$value and !$default, "$key is not defined in .env file");
        return $value or $default;
    }
}

if (!function_exists('throw_when')) {
    function throw_when(bool $fails, string $message, string $exception = Exception::class)
    {
        if (!$fails) {
            return;
        }
        throw new $exception($message);
    }
}

if (!function_exists('routes_path')) {
    function routes_path($path = ''): string
    {
        return base_path("routes/$path");
    }
}

if (!function_exists('base_path')) {
    function base_path($path = ''): string
    {
        return __DIR__ . "/../$path";
    }
}

if (!function_exists('config_path')) {
    function config_path($path = ''): string
    {
        return base_path("config/$path");
    }
}

if (!function_exists('app_path')) {
    function app_path($path = ''): string
    {
        return base_path("app/$path");
    }
}

if (!function_exists('dd')) {
    function dd()
    {
        array_map(static function ($content) {
            echo "<pre>";
            var_dump($content);
            echo "</pre>";
            echo "<hr>";
        }, func_get_args());
        die;
    }
}

if (!function_exists('config_get')) {
    function config_get($path = null)
    {
        $config = [];
        $folder = scandir(config_path());
        $config_files = array_slice($folder, 2, count($folder));

        foreach ($config_files as $file) {
            data_set($config, Str::before($file, '.php'), require config_path($file));
        }
        return data_get($config, $path);
    }
}

if (!function_exists('data_get')) {
    /**
     * Get an item from an array or object using "dot" notation.
     *
     * @param mixed $target
     * @param string|array|int|null $key
     * @param mixed $default
     * @return mixed
     */
    function data_get($target, $key, $default = null)
    {
        if (is_null($key)) {
            return $target;
        }

        $key = is_array($key) ? $key : explode('.', $key);

        while (!is_null($segment = array_shift($key))) {
            if ($segment === '*') {
                if ($target instanceof Collection) {
                    $target = $target->all();
                } elseif (!is_array($target)) {
                    return value($default);
                }

                $result = [];

                foreach ($target as $item) {
                    $result[] = data_get($item, $key);
                }

                return in_array('*', $key, true) ? Arr::collapse($result) : $result;
            }

            if (Arr::accessible($target) && Arr::exists($target, $segment)) {
                $target = $target[$segment];
            } elseif (is_object($target) && isset($target->{$segment})) {
                $target = $target->{$segment};
            } else {
                return value($default);
            }
        }

        return $target;
    }
}

if (!function_exists('data_set')) {
    /**
     * Set an item on an array or object using dot notation.
     *
     * @param mixed $target
     * @param string|array $key
     * @param mixed $value
     * @param bool $overwrite
     * @return mixed
     */
    function data_set(&$target, $key, $value, bool $overwrite = true)
    {
        $segments = is_array($key) ? $key : explode('.', $key);

        if (($segment = array_shift($segments)) === '*') {
            if (!Arr::accessible($target)) {
                $target = [];
            }

            if ($segments) {
                foreach ($target as &$inner) {
                    data_set($inner, $segments, $value, $overwrite);
                }
            } elseif ($overwrite) {
                foreach ($target as &$inner) {
                    $inner = $value;
                }
            }
        } elseif (Arr::accessible($target)) {
            if ($segments) {
                if (!Arr::exists($target, $segment)) {
                    $target[$segment] = [];
                }

                data_set($target[$segment], $segments, $value, $overwrite);
            } elseif ($overwrite || !Arr::exists($target, $segment)) {
                $target[$segment] = $value;
            }
        } elseif (is_object($target)) {
            if ($segments) {
                if (!isset($target->{$segment})) {
                    $target->{$segment} = [];
                }

                data_set($target->{$segment}, $segments, $value, $overwrite);
            } elseif ($overwrite || !isset($target->{$segment})) {
                $target->{$segment} = $value;
            }
        } else {
            $target = [];

            if ($segments) {
                data_set($target[$segment], $segments, $value, $overwrite);
            } elseif ($overwrite) {
                $target[$segment] = $value;
            }
        }

        return $target;
    }
}
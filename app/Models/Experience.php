<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use \App\Traits\OptimizesImages;

    protected $guarded = [];

    protected static function booted(): void
    {
        static::saved(function (Experience $exp) {
            if ($exp->wasChanged('logo_path')) {
                $exp->optimizeImageToWebp('logo_path');
            }
        });
    }
}

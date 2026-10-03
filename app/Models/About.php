<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use \App\Traits\OptimizesImages;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (About $about) {
            if ($about->is_active) {
                static::where('id', '!=', $about->id)->update(['is_active' => false]);
            }
        });
        
        static::saved(function (About $about) {
            if ($about->wasChanged('profile_image')) {
                $about->optimizeImageToWebp('profile_image');
            }
        });
    }
}


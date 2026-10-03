<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'greetings' => 'array',
            'is_active' => 'boolean',
        ];
    }

    protected static function booted()
    {
        static::saving(function ($hero) {
            if ($hero->is_active) {
                // Set all other heroes to inactive
                static::where('id', '!=', $hero->id)->update(['is_active' => false]);
            }
        });
    }
}

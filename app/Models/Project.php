<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use \App\Traits\OptimizesImages;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'media' => 'array',
        ];
    }
    
    protected static function booted(): void
    {
        static::saving(function (Project $project) {
            if (!$project->slug && $project->title) {
                $project->slug = \Illuminate\Support\Str::slug($project->title);
            }
        });

        static::saved(function (Project $project) {
            if ($project->wasChanged('media')) {
                $project->optimizeMediaArrayToWebp('media');
            }
        });
    }
}

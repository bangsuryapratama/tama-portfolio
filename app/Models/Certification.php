<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Traits\OptimizesImages;
class Certification extends Model {
    use OptimizesImages;
    protected $guarded = [];
    protected $casts = [
        'media' => 'array',
    ];
}

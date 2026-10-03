<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $settings = \App\Models\Setting::pluck('value', 'key')->toArray();
    $activeHero = \App\Models\Hero::where('is_active', true)->first();
    $about = \App\Models\About::where('is_active', true)->first();

    $data = [
        'experiences' => \App\Models\Experience::orderBy('sort_order')->get(),
        'skills' => \App\Models\Skill::orderBy('sort_order')->get(),
        'projects' => \App\Models\Project::orderBy('sort_order')->get(),
        'certifications' => \App\Models\Certification::orderBy('sort_order')->get(),
        'settings' => $settings,
        'hero' => $activeHero,
        'about' => $about,
    ];
    return view('app', ['initialData' => $data]);
});

Route::get('/project/{slug}', function ($slug) {
    $project = \App\Models\Project::where('slug', $slug)->firstOrFail();
    return view('project', ['project' => $project]);
});

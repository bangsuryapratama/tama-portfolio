<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    @php
        $title = $project->title_en ?? $project->title;
        $desc = Str::limit(strip_tags($project->description_en ?? $project->description), 150);
        $url = url('/project/' . $project->slug);
        
        $media = is_string($project->media) ? json_decode($project->media, true) : $project->media;
        $image = (!empty($media) && is_array($media)) ? url('storage/' . $media[0]) : url('images/setup_bg_desktop.jpg');
    @endphp

    <title>{{ $title }} | Portfolio</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="{{ $title }} | Portfolio">
    <meta name="description" content="{{ $desc }}">
    <meta name="keywords" content="{{ $project->title }}, Portfolio, Web Development, Software Engineering">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }} | Portfolio">
    <meta property="og:description" content="{{ $desc }}">
    <meta property="og:image" content="{{ $image }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ $url }}">
    <meta property="twitter:title" content="{{ $title }} | Portfolio">
    <meta property="twitter:description" content="{{ $desc }}">
    <meta property="twitter:image" content="{{ $image }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    
    <!-- Preload First Media -->
    <link rel="preload" as="image" href="{{ $image }}">
    
    <script>
        window.projectData = {!! json_encode($project) !!};
    </script>
    
    @viteReactRefresh
    @vite(['resources/js/project.jsx'])
</head>
<body class="bg-black text-white antialiased">
    <div id="project-app"></div>

    <!-- SEO Fallback Content for Crawlers (Noscript) -->
    <noscript>
        <h1>{{ $title }}</h1>
        <p>{{ $desc }}</p>
        <img src="{{ $image }}" alt="{{ $title }}" />
    </noscript>
</body>
</html>

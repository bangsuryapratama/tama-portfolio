<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @php
        $s = $initialData['settings'] ?? [];
        $hero = $initialData['hero'] ?? null;
        $about = $initialData['about'] ?? null;
        $title = $hero ? $hero['name'] : 'Surya Pratama';
        
        // Clean HTML tags from About description for SEO meta
        $desc = $about ? strip_tags($about['description_en']) : 'Developer, Creative, Dreamer. Portfolio of Surya Pratama.';
        // Truncate to 150 chars for optimal SEO
        $desc = Str::limit($desc, 150);
        
        $url = config('app.url');
    @endphp

    <title>{{ $title }} | Portfolio</title>

    <!-- Primary Meta Tags -->
    <meta name="title" content="{{ $title }} | Portfolio">
    <meta name="description" content="{{ $desc }}">
    <meta name="author" content="{{ $title }}">
    <meta name="keywords" content="Portfolio, {{ $title }}, Web Developer, Laravel, React, Creative Developer">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $url }}">
    <meta property="og:title" content="{{ $title }} | Portfolio">
    <meta property="og:description" content="{{ $desc }}">
    <meta property="og:image" content="{{ $url }}/images/setup_bg_desktop.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ $url }}">
    <meta property="twitter:title" content="{{ $title }} | Portfolio">
    <meta property="twitter:description" content="{{ $desc }}">
    <meta property="twitter:image" content="{{ $url }}/images/setup_bg_desktop.jpg">

    <!-- JSON-LD Structured Data for Google -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org/",
      "@@type": "Person",
      "name": "{{ $title }}",
      "url": "{{ $url }}",
      "image": "{{ $url }}/images/setup_bg_desktop.jpg",
      "jobTitle": "Web Developer",
      "sameAs": [
        "{{ $s['contact_github'] ?? '' }}",
        "{{ $s['contact_linkedin'] ?? '' }}"
      ]
    }
    </script>

    <!-- Lowkey Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Preconnect & Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=block"
        rel="stylesheet">

    <!-- Preload LCP Image -->
    <link rel="preload" as="image" href="/images/setup_bg_desktop.jpg" media="(min-width: 768px)">
    <link rel="preload" as="image" href="/images/setup_bg_mobile.jpg" media="(max-width: 767px)">

    <script>
        window.initialData = @json($initialData);
    </script>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>

<body style="background-color: #050505; color: #ffffff;">
    <div id="app"></div>

    <!-- SEO Fallback Content for Crawlers (Noscript) -->
    <noscript>
        <h1>{{ $title }}</h1>
        <p>{{ $desc }}</p>
        <h2>Work Experience</h2>
        <ul>
            @foreach ($initialData['experiences'] ?? [] as $exp)
                <li>{{ $exp['title'] }} at {{ $exp['company'] }}</li>
            @endforeach
        </ul>
    </noscript>
</body>

</html>

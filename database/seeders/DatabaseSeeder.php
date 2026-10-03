<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Tama Admin',
            'email' => 'admin@tama.com',
            'password' => bcrypt('password'),
        ]);

        // Experiences
        \App\Models\Experience::create([
            'title' => 'Fullstack Developer',
            'company' => 'Tech Agency',
            'duration' => '2022 - Present',
            'description_en' => 'Developing robust web applications using Laravel and React. Architecting databases and leading front-end implementations for various corporate clients.',
            'description_id' => 'Mengembangkan aplikasi web menggunakan Laravel dan React. Merancang database dan memimpin implementasi antarmuka untuk berbagai klien perusahaan.',
            'sort_order' => 1
        ]);

        \App\Models\Experience::create([
            'title' => 'Frontend Engineer',
            'company' => 'Startup Inc',
            'duration' => '2020 - 2022',
            'description_en' => 'Focused on crafting seamless user experiences with modern JavaScript frameworks and responsive CSS.',
            'description_id' => 'Fokus pada pembuatan pengalaman pengguna yang mulus dengan framework JavaScript modern dan CSS responsif.',
            'sort_order' => 2
        ]);

        // Skills
        $backendSkills = ['PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'RESTful APIs'];
        foreach ($backendSkills as $i => $s) {
            \App\Models\Skill::create(['category' => 'Backend & Database', 'name' => $s, 'sort_order' => $i]);
        }

        $frontendSkills = ['JavaScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Vite'];
        foreach ($frontendSkills as $i => $s) {
            \App\Models\Skill::create(['category' => 'Frontend & UI', 'name' => $s, 'sort_order' => $i]);
        }

        $tools = ['Git', 'Docker', 'Linux', 'AWS', 'Nginx'];
        foreach ($tools as $i => $s) {
            \App\Models\Skill::create(['category' => 'Tools & Deployment', 'name' => $s, 'sort_order' => $i]);
        }

        // Projects
        \App\Models\Project::create([
            'title' => 'E-Commerce Platform',
            'description_en' => 'A scalable multi-vendor e-commerce platform with real-time analytics.',
            'description_id' => 'Platform e-commerce multi-vendor yang dapat diskalakan dengan analitik real-time.',
            'image_path' => null,
            'tech_stack' => ['Laravel', 'React', 'Tailwind', 'MySQL'],
            'link_url' => '#',
            'sort_order' => 1
        ]);

        \App\Models\Project::create([
            'title' => 'Fintech Dashboard',
            'description_en' => 'Secure and beautiful financial dashboard for monitoring transactions.',
            'description_id' => 'Dashboard keuangan yang aman dan indah untuk memantau transaksi.',
            'image_path' => null,
            'tech_stack' => ['React', 'Framer Motion', 'Node.js'],
            'link_url' => '#',
            'sort_order' => 2
        ]);

        // Settings
        $settings = [
            ['key' => 'hero_name', 'value' => 'SURYA PRATAMA', 'group' => 'Hero'],
            ['key' => 'hero_subtitle_en', 'value' => 'Refugium', 'group' => 'Hero'],
            ['key' => 'hero_subtitle_id', 'value' => 'Refugium', 'group' => 'Hero'],
            ['key' => 'hero_definition_en', 'value' => '/rɪˈfjuːdʒɪəm/ — A Latin word meaning a place of refuge, shelter, or safe haven.', 'type' => 'textarea', 'group' => 'Hero'],
            ['key' => 'hero_greetings', 'value' => json_encode([
                "Welcome",
                "Selamat Datang",
                "Bienvenue",
                "Willkommen",
                "Benvenuto",
                "ようこそ",
                "환영합니다",
                "مرحباً"
            ]), 'type' => 'json', 'group' => 'Hero'],
            ['key' => 'about_title_en', 'value' => 'Refugium tuh bukan sekedar nama, tapi sebuah ruang berlindung.', 'type' => 'textarea', 'group' => 'About'],
            ['key' => 'about_title_id', 'value' => 'Refugium tuh bukan sekedar nama, tapi sebuah ruang berlindung.', 'type' => 'textarea', 'group' => 'About'],
            ['key' => 'about_desc_en', 'value' => "It's a latin word for shelter or sanctuary. A place where ideas find their form and logic meets creativity.", 'type' => 'textarea', 'group' => 'About'],
            ['key' => 'about_desc_id', 'value' => "Ini adalah kata latin untuk tempat berteduh. Tempat di mana ide-ide menemukan bentuknya dan logika bertemu kreativitas.", 'type' => 'textarea', 'group' => 'About'],
            ['key' => 'contact_email', 'value' => 'hello@tama.com', 'group' => 'Contact'],
            ['key' => 'contact_github', 'value' => 'https://github.com/tama', 'group' => 'Contact'],
            ['key' => 'contact_linkedin', 'value' => 'https://linkedin.com/in/tama', 'group' => 'Contact'],
            ['key' => 'audio_title', 'value' => 'The Weeknd - Call Out My Name', 'group' => 'Audio'],
            ['key' => 'audio_url', 'value' => 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/0a/ca/d50aca46-f871-b774-077a-22cbb42df336/mzaf_7520446500958405524.plus.aac.p.m4a', 'group' => 'Audio']
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::create([
                'key' => $setting['key'],
                'value' => $setting['value'],
                'type' => $setting['type'] ?? 'text',
                'group' => $setting['group'] ?? 'General',
            ]);
        }
    }
}

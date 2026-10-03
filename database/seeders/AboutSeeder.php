<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\About;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        About::create([
            'profile_image' => 'about/profile_portrait.jpg', // Assuming you'll move it or just use null to fallback
            'heading_en' => 'I am a digital builder exploring the intersection of design, code, and seamless user experiences.',
            'heading_id' => 'Saya adalah seorang digital builder yang mengeksplorasi titik temu antara desain, kode, dan pengalaman pengguna.',
            'description_en' => '"Refugium" represents my philosophy—creating digital spaces that are safe, reliable, and aesthetically pleasing. Based in Indonesia, I specialize in crafting modern web applications utilizing Laravel and React. I focus on the logic and the flow, letting the best tools handle the rest.',
            'description_id' => '"Refugium" mewakili filosofi saya—menciptakan ruang digital yang aman, andal, dan estetis. Berbasis di Indonesia, saya berspesialisasi dalam merancang aplikasi web modern menggunakan Laravel dan React. Saya berfokus pada logika dan alur, membiarkan tools terbaik menangani sisanya.',
            'is_active' => true,
        ]);
    }
}

<?php
$idols = [
    [
        'id' => 'quran',
        'name' => 'Al-Quran (Surah Al-Insyirah: 5-6)',
        'arabic' => 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        'quote' => '"Maka sesungguhnya bersama kesulitan itu ada kemudahan. Sesungguhnya bersama kesulitan itu ada kemudahan."',
        'tags' => ['Divine Guidance', 'Ultimate Truth'],
        'image' => '/images/quran.jpg',
        'source' => 'https://quran.com/94/5-6',
    ],
    [
        'id' => '2pac',
        'name' => 'Tupac Shakur',
        'quote' => "I'm not saying I'm gonna change the world, but I guarantee that I will spark the brain that will change the world.",
        'tags' => ['MTV Interview (1994)', 'Legend'],
        'image' => '/images/tupac.jpg',
        'source' => 'https://www.youtube.com/watch?v=YcG5m6rWn2U',
    ],
    [
        'id' => 'ronaldo',
        'name' => 'Cristiano Ronaldo',
        'quote' => '"Talent without working hard is nothing."',
        'tags' => ['Interview', 'GOAT'],
        'image' => '/images/ronaldo.jpg',
        'source' => 'https://www.goal.com/en/news/cristiano-ronaldo-talent-without-working-hard-is-nothing/1y70c3',
    ],
    [
        'id' => 'farid',
        'name' => 'Farid Stevy (FSTVLST)',
        'title' => 'Gas!',
        'quote' => '"Berjalan tak seperti rencana adalah jalan yang sudah biasa. Dan jalan satu-satunya, jalani sebaik kau bisa."',
        'tags' => ['Lyric: Gas!', 'Artist'],
        'image' => '/images/farid.jpg',
        'source' => 'https://www.youtube.com/watch?v=4qJb2tMnOEY',
    ],
    [
        'id' => 'kobe',
        'name' => 'Kobe Bryant',
        'quote' => '"I have nothing in common with lazy people who blame others for their lack of success."',
        'tags' => ['Mamba Mentality', 'Interview'],
        'image' => '/images/kobe.jpg',
        'source' => 'https://www.si.com/nba/2015/10/12/kobe-bryant-lazy-people-quote',
    ],
    [
        'id' => 'windah',
        'name' => 'Brando (Windah Basudara)',
        'quote' => '"Mimpi itu harus dikejar, jangan dengerin apa kata orang yang mau ngejatuhin kalian. Buktikan ke mereka!"',
        'tags' => ['Charity Stream', 'Entertainer'],
        'image' => '/images/windah.jpg',
        'source' => 'https://www.youtube.com/watch?v=8B3cVXrF3jU',
    ],
    [
        'id' => 'goggins',
        'name' => 'David Goggins',
        'quote' => "I don't stop when I'm tired, I stop when I'm done.",
        'tags' => ['Can\'t Hurt Me', 'Mental Toughness'],
        'image' => '/images/goggins.jpg',
        'source' => 'https://www.goodreads.com/quotes/1082080-i-don-t-stop-when-i-m-tired-i-stop-when-i',
    ],
];
?>
<x-filament-widgets::widget>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        @foreach ($idols as $idol)
            @php
                $isQuran = $idol['id'] === 'quran';
                $borderColor = $isQuran ? '#d4af37' : '#3f3f46';
                $nameColor = $isQuran ? '#d4af37' : 'white';
                $quoteColor = $isQuran ? '#fef08a' : '#a1a1aa';
            @endphp

            <x-filament::section
                style="height: 100%; {{ $isQuran ? 'grid-column: 1 / -1; border: 1px solid #d4af37; box-shadow: 0 0 25px rgba(212, 175, 55, 0.15); background: linear-gradient(135deg, #18181b 0%, #27272a 100%);' : 'background: #18181b; border: 1px solid #27272a;' }}">

                @if ($isQuran)
                    {{-- QURAN FULL-WIDTH LAYOUT --}}
                    <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
                        <div
                            style="width: 140px; height: 140px; flex-shrink: 0; border-radius: 50%; overflow: hidden; border: 3px solid {{ $borderColor }}; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);">
                            <img src="{{ $idol['image'] }}" alt="{{ $idol['name'] }}"
                                style="width: 100%; height: 100%; object-fit: cover;">
                        </div>

                        <div style="display: flex; flex-direction: column; flex: 1; min-width: 250px;">
                            <h2
                                style="font-size: 1.75rem; font-weight: bold; font-family: 'Oswald', sans-serif; color: {{ $nameColor }}; margin: 0; letter-spacing: 0.05em;">
                                {{ $idol['name'] }}
                            </h2>

                            <p
                                style="color: #d4af37; font-size: 2rem; font-family: 'Amiri', serif; margin-top: 0.5rem; text-align: left; line-height: 1.5;">
                                {{ $idol['arabic'] }}
                            </p>

                            <p
                                style="color: {{ $quoteColor }}; font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.25rem; margin-top: 0.5rem; line-height: 1.6; max-width: 100%;">
                                {{ $idol['quote'] }}
                            </p>

                            <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                                @foreach ($idol['tags'] as $tag)
                                    <span
                                        style="font-size: 0.75rem; font-weight: 600; background-color: rgba(212, 175, 55, 0.1); color: #d4af37; padding: 0.35rem 1rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.1em; border: 1px solid rgba(212, 175, 55, 0.3);">
                                        {{ $tag }}
                                    </span>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @else
                    {{-- IDOLS VERTICAL LAYOUT --}}
                    <div
                        style="display: flex; flex-direction: column; align-items: center; text-align: center; height: 100%;">
                        <div style="width: 110px; height: 110px; border-radius: 50%; overflow: hidden; border: 2px solid {{ $borderColor }}; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); filter: grayscale(100%); transition: filter 0.5s;"
                            onmouseover="this.style.filter='grayscale(0%)'"
                            onmouseout="this.style.filter='grayscale(100%)'">
                            <img src="{{ $idol['image'] }}" alt="{{ $idol['name'] }}"
                                style="width: 100%; height: 100%; object-fit: cover;">
                        </div>

                        <h2
                            style="font-size: 1.25rem; font-weight: bold; font-family: 'Oswald', sans-serif; color: {{ $nameColor }}; margin: 1rem 0 0 0; letter-spacing: 0.05em;">
                            {{ $idol['name'] }}
                        </h2>

                        <p
                            style="color: {{ $quoteColor }}; font-family: 'Playfair Display', serif; font-style: italic; font-size: 1rem; margin-top: 0.75rem; line-height: 1.6; flex-grow: 1;">
                            {{ $idol['quote'] }}
                        </p>

                        <div
                            style="margin-top: 1.25rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                            @foreach ($idol['tags'] as $tag)
                                <span
                                    style="font-size: 0.65rem; font-weight: 600; background-color: #27272a; color: #d4d4d8; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.1em; border: 1px solid #3f3f46;">
                                    {{ $tag }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                @endif

            </x-filament::section>
        @endforeach
    </div>


</x-filament-widgets::widget>

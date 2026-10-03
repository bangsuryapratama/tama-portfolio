<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class IdolsWidget extends Widget
{
    protected static string $view = 'filament.widgets.idols-widget';
    protected int | string | array $columnSpan = 'full';
    protected static ?int $sort = 2;
}

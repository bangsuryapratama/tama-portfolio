<?php
namespace App\Filament\Pages;

class Dashboard extends \Filament\Pages\Dashboard
{
    protected static ?string $title = 'Little Notes';
    protected static ?string $navigationLabel = 'Little Notes';

    public function getHeading(): string | \Illuminate\Contracts\Support\Htmlable
    {
        return 'Little Notes';
    }
}

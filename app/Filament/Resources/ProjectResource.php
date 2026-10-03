<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-code-bracket-square';
    protected static ?string $navigationGroup = 'Portfolio';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Language')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('title_en')
                                    ->required()
                                    ->label('Title (EN)'),
                                Forms\Components\Textarea::make('description_en')
                                    ->required()
                                    ->label('Description (EN)'),
                            ]),
                        Forms\Components\Tabs\Tab::make('Indonesia')
                            ->schema([
                                Forms\Components\TextInput::make('title_id')
                                    ->required()
                                    ->label('Title (ID)'),
                                Forms\Components\Textarea::make('description_id')
                                    ->required()
                                    ->label('Description (ID)'),
                            ]),
                    ])->columnSpanFull(),
                Forms\Components\TextInput::make('title')
                    ->label('Internal Title (Used for slug generation)')
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Auto-generated from title.'),
                Forms\Components\TextInput::make('year')
                    ->label('Project Year (e.g. 2026 — Ongoing)')
                    ->maxLength(255),
                Forms\Components\FileUpload::make('media')
                    ->multiple()
                    ->reorderable()
                    ->acceptedFileTypes(['image/*', 'video/*'])
                    ->directory('projects')
                    ->columnSpanFull(),
                Forms\Components\TagsInput::make('tech_stack')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('link_url'),
                Forms\Components\Toggle::make('is_featured')
                    ->required(),
                Forms\Components\TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('link_url')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}

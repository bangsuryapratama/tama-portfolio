<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_id')->nullable()->after('title_en');
            $table->string('company_en')->nullable()->after('company');
            $table->string('company_id')->nullable()->after('company_en');
            $table->string('duration_en')->nullable()->after('duration');
            $table->string('duration_id')->nullable()->after('duration_en');
        });
    }

    public function down(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'title_id', 'company_en', 'company_id', 'duration_en', 'duration_id']);
        });
    }
};

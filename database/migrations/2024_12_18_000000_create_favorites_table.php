<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('dino_id'); // MongoDB ObjectId stored as string
            $table->string('dino_name');
            $table->text('image')->nullable();
            $table->longText('note')->nullable();
            $table->timestamps();
            
            // Composite unique index to prevent duplicate favorites per user
            $table->unique(['user_id', 'dino_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};

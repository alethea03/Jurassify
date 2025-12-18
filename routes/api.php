<?php

use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public user endpoint (works for both authenticated and unauthenticated)
Route::get('/user', [UserController::class, 'current']);

Route::middleware(['auth:web', 'verified'])->group(function () {
    // User endpoints
    Route::patch('/user', [UserController::class, 'updateProfile']);

    // Get all favorites for the authenticated user
    Route::get('/favorites', [FavoritesController::class, 'index']);

    // Add a new favorite
    Route::post('/favorites', [FavoritesController::class, 'store']);

    // Update a favorite
    Route::patch('/favorites/{id}', [FavoritesController::class, 'update']);

    // Delete a favorite by ID
    Route::delete('/favorites/{id}', [FavoritesController::class, 'destroy']);

    // Delete a favorite by dino_id
    Route::post('/favorites/delete-by-dino', [FavoritesController::class, 'destroyByDinoId']);
});

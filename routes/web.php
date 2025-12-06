<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

file_put_contents(storage_path('logs/web-routes-hit.log'), 'web.php loaded at '.now().PHP_EOL, FILE_APPEND);

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';

Route::post('/mock-login', function (\Illuminate\Http\Request $request) {
    $email = $request->email;

    $user = DB::table('users')->where('email', $email)->first();

    if (! $user) {
        return response()->json([
            'success' => false,
            'message' => 'User not found',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Mock login successful',
        'user' => $user,
    ]);
});



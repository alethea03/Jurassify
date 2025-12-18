<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoritesController extends Controller
{
    /**
     * Get all favorites for the authenticated user.
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $favorites = $user->favorites()->get();

        return response()->json($favorites);
    }

    /**
     * Add a favorite for the authenticated user.
     */
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'dino_id' => 'required|string',
            'dino_name' => 'required|string',
            'image' => 'nullable|string',
            'note' => 'nullable|string',
        ]);

        // Check if favorite already exists
        $existing = Favorite::where('user_id', $user->id)
            ->where('dino_id', $validated['dino_id'])
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Favorite already exists'], 409);
        }

        $favorite = Favorite::create([
            'user_id' => $user->id,
            'dino_id' => $validated['dino_id'],
            'dino_name' => $validated['dino_name'],
            'image' => $validated['image'] ?? null,
            'note' => $validated['note'] ?? null,
        ]);

        return response()->json($favorite, 201);
    }

    /**
     * Update a favorite for the authenticated user.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $favorite = Favorite::where('user_id', $user->id)->findOrFail($id);

        $validated = $request->validate([
            'note' => 'nullable|string',
            'dino_name' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $favorite->update($validated);

        return response()->json($favorite);
    }

    /**
     * Delete a favorite for the authenticated user.
     */
    public function destroy($id): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $favorite = Favorite::where('user_id', $user->id)->findOrFail($id);
        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully']);
    }

    /**
     * Delete a favorite by dino_id for the authenticated user.
     */
    public function destroyByDinoId(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'dino_id' => 'required|string',
        ]);

        $favorite = Favorite::where('user_id', $user->id)
            ->where('dino_id', $validated['dino_id'])
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully']);
    }
}

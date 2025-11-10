<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Make sure to import Inertia

class HomeController extends Controller
{
    /**
     * Renders the single-page application entry point.
     */
    public function index()
    {
        // This tells Inertia to look for the React component at:
        // resources/js/Pages/Home.jsx
        return Inertia::render('Home', [
            // Any initial data you need to pass can go here
            'appName' => 'Jurassify',
        ]);
    }
}

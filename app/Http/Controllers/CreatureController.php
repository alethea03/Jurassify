<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Make sure Inertia is imported!

class CreatureController extends Controller
{
    /**
     * Display the application home page and pass the creature data.
     */
    public function index()
    {
        // 1. Mock Data: This structure matches the TypeScript interface we defined
        $creatures = [
            [
                'id' => 1,
                'name' => 'Tyrannosaurus Rex',
                'era' => 'Cretaceous',
                'diet' => 'Carnivore',
                'description_short' => 'The largest known tyrannosaurid, T. Rex was an apex predator.',
                'image_url' => '/images/t-rex.png',
            ],
            [
                'id' => 2,
                'name' => 'Triceratops',
                'era' => 'Cretaceous',
                'diet' => 'Herbivore',
                'description_short' => 'A large, plant-eating dinosaur known for its large frill and three horns.',
                'image_url' => '/images/triceratops.png',
            ],
            [
                'id' => 3,
                'name' => 'Brachiosaurus',
                'era' => 'Jurassic',
                'diet' => 'Herbivore',
                'description_short' => 'One of the tallest and largest dinosaurs, known for its long neck and tail.',
                'image_url' => '/images/brachiosaurus.png',
            ],
        ];

        // 2. Pass the data to the Inertia component (Home.tsx)
        return Inertia::render('Home', [
            // Passing the creature data as a prop named 'creatures'
            'creatures' => $creatures,
        ]);
    }
}
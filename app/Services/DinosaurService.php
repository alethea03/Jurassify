<?php

namespace App\Services;

class DinosaurService
{
    /**
     * @return array
     */
    public function getAllCreatures(): array
    {
        return[
            [
                'id' => 1,
                'name' => 'Tyrannosaurus Rex',
                'era' => 'Cretaceous',
                'diet' => 'Carnivore',
                'category' => 'DINOSAURS',
                'description_short' => 'The largest known tyrannosaurid, T. Rex was an apex predator.',
                // Mock coordinates for demonstration (e.g., North America)
                'location_map_coord' => ['lat' => 50, 'lng' => -100],
                'image_url' => '/images/t-rex.png',
            ],
            [
                'id' => 2,
                'name' => 'Triceratops',
                'era' => 'Cretaceous',
                'diet' => 'Herbivore',
                'category' => 'DINOSAURS', // <-- NEW FIELD
                'description_short' => 'A large, plant-eating dinosaur known for its large frill and three horns.',
                // Mock coordinates for demonstration (e.g., North America)
                'location_map_coord' => ['lat' => 45, 'lng' => -110], // <-- NEW FIELD
                'image_url' => '/images/triceratops.png',
            ],
            [
                'id' => 3,
                'name' => 'Brachiosaurus',
                'era' => 'Jurassic',
                'diet' => 'Herbivore',
                'category' => 'DINOSAURS', // <-- NEW FIELD
                'description_short' => 'One of the tallest and largest dinosaurs, known for its long neck and tail.',
                // Mock coordinates for demonstration (e.g., Africa/Europe)
                'location_map_coord' => ['lat' => 20, 'lng' => 10], // <-- NEW FIELD
                'image_url' => '/images/brachiosaurus.png',
            ],
            [
                'id' => 4,
                'name' => 'Rhamphorhynchus',
                'era' => 'Late Jurassic Epoch',
                'diet' => 'Piscivore',
                'category' => 'PTEROSAURS', // <-- NEW FIELD (Matches the image filter)
                'description_short' => 'Found famously in the Solnhofen Limestone of Bavaria, Germany.',
                // Mock coordinates for demonstration (e.g., Europe)
                'location_map_coord' => ['lat' => 48, 'lng' => 11], // <-- NEW FIELD
                'image_url' => '/images/rhamphorhynchus.png',
            ],
        ];
    }
}
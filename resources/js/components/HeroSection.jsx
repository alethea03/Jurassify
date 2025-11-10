import React, {useState} from 'react';

//Mock data (replace with backend props later)
export default function HeroSection(){
    const [hero, setHero] = useState({
        title: 'Jurassify',
        catchphrase: 'Travel Back in Time to Meet the Dinosaurs!',
        buttonText: 'Become a Time Traveler',
    });

    const handleButtonClick = () => {
        //for now, just log or navigate to a mock page
        alert ('Navigate to Log In / Sign Up page');
    };

    return(
        <section className="hero bg-gradient-to-r from-green-700 to blue-500 text-white flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
            <p className="text-xl mb-8">{hero.catchphrase}</p>
            <button
                onClick={handleButtonClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                    {hero.buttonText}
                </button>
        </section>
    );
}
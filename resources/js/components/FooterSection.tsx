import React from 'react';
import { FaGithub, FaMapMarkedAlt, FaCode, FaEnvelope } from 'react-icons/fa'; // Assuming you use react-icons

export default function FooterSection() {
    // Define the navigation links
    // Use URLs / in-page anchors for href values. Components themselves should not be used as hrefs.
    const mainLinks = [
        { name: 'Timeline Map', href: '#timeline', icon: FaMapMarkedAlt },
        { name: 'Contributors', href: '#contributors', icon: FaCode },
        { name: 'Source Code', href: 'https://github.com/alethea03/Jurassify', icon: FaGithub, external: true },
        { name: 'Contact Us', href: '#contact', icon: FaEnvelope }, // in-page anchor to contact section
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '#policy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Sitemap', href: '#sitemap' },
    ];

    // List of team emails
    const teamEmails = [
        "aletheasanchez25@gmail.com",
        "randohuyan@gmail.com",
        "ocanakristelmae@gmail.com",
    ];

    return (
        <footer className="bg-black text-slate-400 border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
                    
                    {/* Column 1: Branding and Copyright (Col Span 4) */}
                    <div className="col-span-full md:col-span-2 lg:col-span-4 space-y-4">
                        <h3 className="text-2xl font-extrabold text-green-400 tracking-wider">
                            JURASSIFY
                        </h3>
                        <p className="text-sm">
                            Your Virtual Time Machine to Prehistoric Life.
                        </p>
                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} The Ark Collective. All rights reserved.
                        </p>
                    </div>

                    {/* Column 2: Quick Links (Col Span 3) */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-3">
                        <h4 className="font-semibold text-white mb-4 border-b border-slate-700/50 pb-1">Quick Links</h4>
                        <ul className="space-y-3">
                            {mainLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        target={link.external ? '_blank' : '_self'}
                                        rel={link.external ? 'noopener noreferrer' : ''}
                                        className="text-sm hover:text-green-400 transition-colors flex items-center gap-2"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Contact (Col Span 3) */}
                    {/* 🚨 RESTRUCTURED EMAIL SECTION */}
                        <div className="pt-4">
                            <h5 className="font-semibold text-white">Email:</h5>
                            <ul className="mt-1 space-y-1">
                                {teamEmails.map((email) => (
                                    <li key={email}>
                                        <a 
                                            href={`mailto:${email}`}
                                            className="text-sm block hover:text-green-400 transition-colors"
                                        >
                                            {email}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>

                {/* Final Attribution Row */}
                <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
                    <p>
                        Map data provided by Leaflet and OpenStreetMap. Dinosaur and Creature models are for visualization only.
                    </p>
                </div>
            </div>
        </footer>
    );
}
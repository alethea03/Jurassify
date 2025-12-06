import React, { useState } from 'react';

export type Developer = {
    name: string;
    role?: string;
    github?: string;
    facebook?: string;
    program?: string;
    dream_job?: string;
    hobbies?: string;
    skills?: string;
    note?: string;
};

type DevelopersSectionProps = {
  title?: string;
  description?: string;
  developers?: Developer[];
};

const defaultDevelopers: Developer[] = [
    { 
        name: 'Alethea', 
        role: 'Designer & Frontend Developer', 
        github: 'https://github.com/alethea03', 
        facebook: 'www.facebook.com/aletheasanchez.9',
        program: 'Information Technology',
        dream_job: 'Web Developer and Designer at a leading tech company.',
        hobbies: 'Singing, crocheting, and exploring new cafes.',
        skills: 'HTML, CSS, JavaScript, Figma, Canva, Adobe, and basic React.',
    },
    { 
        name: 'Reo', 
        role: 'Lead Backend Developer & API Specialist', 
        github: 'https://github.com/reojohn', 
        facebook: '#',
        program: 'Information Technology',
        dream_job: 'Principal Architect for distributed systems.',
        hobbies: 'Competitive coding, photography, and historical documentaries.',
        skills: 'PHP/Laravel, MySQL, AWS, Docker.',
    },
    { 
        name: 'Kristel Mae', 
        role: 'Database Developer', 
        github: 'https://github.com/ocanakristel', 
        facebook: '#',
        program: 'Information Technology',
        dream_job: 'Tech Lead managing cross-functional teams.',
        hobbies: 'Gaming, reading sci-fi novels, and cooking.',
        skills: 'React, Laravel, TypeScript, Cloud Deployment.',
    },
];

export default function DevelopersSection({
    title = 'Developers & Contributors',
    description = 'Meet the folks who brought Jurassify to life. Want to contribute? Open a PR or reach out!',
    developers = defaultDevelopers, // Use the expanded default data
}: DevelopersSectionProps) {
    
    // 3. New state to track which developer card is currently expanded
    const [expandedDevId, setExpandedDevId] = useState<number | string | null>(null);

    return (
        <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white py-16 px-6" id="contributors">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight text-green-400">{title}</h2>
                    <p className="mt-3 text-lg text-slate-300 max-w-3xl mx-auto">{description}</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {developers.map((dev, idx) => {
                        // Use a unique identifier for state tracking
                        const devId = dev.github || dev.name; 
                        const isExpanded = expandedDevId === devId;
                        
                        // Icon generation logic
                        const iconText = dev.name.split(' ').map(n => n[0]).slice(0,2).join('');

                        return (
                            <article
                                key={`${dev.name}-${idx}`}
                                className={`
                                    bg-gray-900/60 border border-slate-700 p-6 rounded-xl shadow-xl transform transition-all duration-300 
                                    cursor-pointer hover:bg-gray-800/80
                                    ${isExpanded ? 'lg:col-span-3 bg-gray-800/90 shadow-2xl scale-100' : 'hover:scale-[1.02]'}
                                `}
                                onClick={() => setExpandedDevId(isExpanded ? null : devId)}
                            >
                                <div className={`flex ${isExpanded ? 'flex-col sm:flex-row' : 'flex-row'} items-start gap-6`} id="contributors">
                                    
                                    {/* Profile Icon (Always Visible) */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-black border-2 border-white shadow-lg">
                                            {iconText}
                                        </div>
                                    </div>
                                    
                                    {/* Main Compact Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <h3 className="text-3xl font-extrabold text-white">{dev.name}</h3>
                                            {dev.role && <span className="text-md text-green-300 font-semibold">{dev.role}</span>}
                                        </div>

                                        {/* Social Links (Always Visible) */}
                                        <div className="mt-2 flex items-center gap-3">
                                            <span className="text-sm text-slate-400">Socials:</span>
                                            {dev.github && (
                                                <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-green-400 transition-colors">GitHub</a>
                                            )}
                                            {dev.facebook && (
                                                <a href={dev.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:text-blue-400 transition-colors">Facebook</a>
                                            )}
                                        </div>
                                        
                                        {/* 4. Extended Details (Only Visible when Expanded) */}
                                        {isExpanded && (
                                            <div className="mt-6 pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                                
                                                {/* Column 1 */}
                                                <div>
                                                    <p className="font-semibold text-green-400">Program:</p>
                                                    <p>{dev.program}</p>
                                                    
                                                    <p className="font-semibold text-green-400 mt-2">Dream Job/Life:</p>
                                                    <p>{dev.dream_job}</p>
                                                </div>

                                                {/* Column 2 */}
                                                <div>
                                                    <p className="font-semibold text-green-400">Skills:</p>
                                                    <p>{dev.skills}</p>

                                                    <p className="font-semibold text-green-400 mt-2">Hobbies:</p>
                                                    <p>{dev.hobbies}</p>
                                                </div>
                                                
                                                {dev.note && 
                                                    <p className="col-span-full mt-2 italic border-t border-dashed border-slate-700 pt-4">"{dev.note}"</p>
                                                }
                                            </div>
                                        )}
                                        
                                        {/* Expansion indicator */}
                                        <p className="mt-4 text-xs text-slate-500 hover:text-slate-400">
                                            {isExpanded ? 'Click to collapse ▲' : 'Click for full details ▼'}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-10 text-center text-sm text-slate-400">
                    <p>
                        Want to add yourself? Read the contributing docs and open a PR — we welcome help from the community.
                    </p>
                </div>
            </div>
        </section>
    );
}
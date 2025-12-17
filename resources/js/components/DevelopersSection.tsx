import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export type Developer = {
  name: string;
  role?: string;
  github?: string;
  facebook?: string;
  program?: string;
  dream_job?: string;
  hobbies?: string;
  skills?: { name: string; level: number }[];
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
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'React', level: 60 },
      { name: 'Figma', level: 80 },
    ],
  },
  { 
    name: 'Reo', 
    role: 'Lead Backend Developer & API Specialist', 
    github: 'https://github.com/reojohn', 
    facebook: '#',
    program: 'Information Technology',
    dream_job: 'Principal Architect for distributed systems.',
    hobbies: 'Competitive coding, photography, Puzzles, Watching Series, Reading Manga, and historical documentaries.',
    skills: [
      { name: 'PHP/Laravel', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'AWS', level: 70 },
      { name: 'Docker', level: 65 },
      { name: 'Python', level: 80 },
      { name: 'JavaScript', level: 75 },
    ],
  },
  { 
    name: 'Kristel Mae', 
    role: 'Database Developer', 
    github: 'https://github.com/ocanakristel', 
    facebook: '#',
    program: 'Information Technology',
    dream_job: 'Tech Lead managing cross-functional teams.',
    hobbies: 'Gaming, reading sci-fi novels, and cooking.',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Laravel', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'Cloud Deployment', level: 60 },
    ],
  },
];

export default function DevelopersSection({
  title = 'Developers & Contributors',
  description = 'Meet the folks who brought Jurassify to life. Want to contribute? Open a PR or reach out!',
  developers = defaultDevelopers,
}: DevelopersSectionProps) {
    
  const [expandedDevId, setExpandedDevId] = useState<number | string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Make radar chart reactive to theme changes
  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-black text-gray-900 dark:text-white py-16 px-6" id="contributors">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-400">{title}</h2>
          <p className="mt-3 text-lg max-w-3xl mx-auto text-slate-700 dark:text-slate-300">{description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, idx) => {
            const devId = dev.github || dev.name; 
            const isExpanded = expandedDevId === devId;

            return (
              <article
                key={`${dev.name}-${idx}`}
                className={`border border-slate-300 dark:border-slate-700 p-6 rounded-xl shadow-xl transform transition-all duration-300 cursor-pointer
                  ${isExpanded 
                    ? 'lg:col-span-3 bg-gray-100 dark:bg-gray-800 shadow-2xl scale-100' 
                    : 'bg-gray-200/60 dark:bg-gray-900/60 hover:bg-gray-300/80 dark:hover:bg-gray-800/80 hover:scale-[1.02]'
                  }`}
                onClick={() => setExpandedDevId(isExpanded ? null : devId)}
              >
                <div className={`flex ${isExpanded ? 'flex-col sm:flex-row' : 'flex-row'} items-start gap-6`}>
                  <div className="flex-shrink-0">
                    <img 
                      src={
                        dev.name === 'Reo' ? '/reo.png' :
                        dev.name === 'Kristel Mae' ? '/kristel.png' :
                        dev.name === 'Alethea' ? '/alethea.png' :
                        ''
                      } 
                      alt={dev.name} 
                      className="w-20 h-20 rounded-xl border-2 border-white shadow-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap">
                      <h3 className="text-3xl font-extrabold">{dev.name}</h3>
                      {dev.role && <span className="text-md font-semibold text-green-600 dark:text-green-400">{dev.role}</span>}
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Socials:</span>
                      {dev.github && (
                        <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors">GitHub</a>
                      )}
                      {dev.facebook && (
                        <a href={dev.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Facebook</a>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">

                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold text-green-600 dark:text-green-400">Program:</p>
                            <p>{dev.program}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-green-600 dark:text-green-400">Dream Job/Life:</p>
                            <p>{dev.dream_job}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-green-600 dark:text-green-400">Hobbies:</p>
                            <p>{dev.hobbies}</p>
                          </div>
                        </div>

                        <div>
                          {dev.skills && dev.skills.length > 0 && (
                            <div className="h-64 w-full">
                              <Radar 
                                data={{
                                  labels: dev.skills.map(s => s.name),
                                  datasets: [
                                    {
                                      label: `${dev.name} Skill Radar`,
                                      data: dev.skills.map(s => s.level),
                                      backgroundColor: 'rgba(34,197,94,0.2)',
                                      borderColor: 'rgba(34,197,94,1)',
                                      borderWidth: 2,
                                      pointBackgroundColor: 'rgba(34,197,94,1)',
                                    },
                                  ],
                                }}
                                options={{
                                  scales: {
                                    r: {
                                      angleLines: { color: 'rgba(148,163,184,0.2)' },
                                      grid: { color: 'rgba(148,163,184,0.2)' },
                                      suggestedMin: 0,
                                      suggestedMax: 100,
                                      ticks: { display: false, callback: () => '' },
                                      pointLabels: { 
                                        color: isDarkMode ? '#e5e7eb' : '#1f2937',
                                        font: { size: 12 } 
                                      },
                                    },
                                  },
                                  plugins: { legend: { display: false } },
                                  responsive: true,
                                  maintainAspectRatio: false,
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {dev.skills && dev.skills.length > 0 && (
                          <div className="col-span-full mt-4">
                            <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Skills:</p>
                            <div className="space-y-2">
                              {dev.skills.map((skill, i) => (
                                <div key={i}>
                                  <div className="flex justify-between text-sm">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                  </div>
                                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-1">
                                    <div 
                                      className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-500" 
                                      style={{ width: `${skill.level}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {dev.note && 
                          <p className="col-span-full mt-2 italic border-t border-dashed border-slate-300 dark:border-slate-700 pt-4">"{dev.note}"</p>
                        }
                      </div>
                    )}

                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      {isExpanded ? 'Click to collapse ▲' : 'Click for full details ▼'}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>
            Want to add yourself? Read the contributing docs and open a PR — we welcome help from the community.
          </p>
        </div>
      </div>
    </section>
  );
}

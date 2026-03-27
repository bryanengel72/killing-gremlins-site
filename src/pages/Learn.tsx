import React from 'react';
import { PlayCircle, FileText, PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Learn: React.FC = () => {
  const { pinToToolbox } = useAppContext();

  const modules = [
    {
      id: 1,
      title: 'Fear, Call It By Its Name',
      type: 'video',
      duration: '5 min',
      description: 'Understand the difference between stress and threat.',
    },
    {
      id: 2,
      title: 'Naming Your Gremlin',
      type: 'worksheet',
      duration: 'Interactive',
      description: 'Identify your specific performance-interfering thoughts.',
    },
    {
      id: 3,
      title: 'Pause. Breathe. Ground.',
      type: 'audio',
      duration: '8 min',
      description: 'Core regulation skills (5-3-5, PMR).',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand-purple tracking-tight">Learn & Build</h1>
        <p className="text-brand-text-muted text-sm mt-1 font-medium">Core Curriculum Modules</p>
      </header>

      <div className="space-y-6">
        {modules.map((mod) => (
          <div key={mod.id} className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold">
                  {mod.type === 'video' && <PlayCircle className="w-8 h-8" />}
                  {mod.type === 'worksheet' && <FileText className="w-8 h-8" />}
                  {mod.type === 'audio' && <PlayCircle className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-purple">{mod.title}</h3>
                  <p className="text-xs text-brand-text-muted uppercase tracking-widest font-bold mt-1">
                    {mod.type} • {mod.duration}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-brand-text-muted mt-4 leading-relaxed">{mod.description}</p>
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-brand-purple text-white font-bold py-3 px-4 rounded-xl text-sm hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20">
                Start
              </button>
              <button
                onClick={() => pinToToolbox(mod.title)}
                className="flex items-center justify-center bg-white border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/5 font-bold py-3 px-4 rounded-xl text-sm transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add to Toolbox
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

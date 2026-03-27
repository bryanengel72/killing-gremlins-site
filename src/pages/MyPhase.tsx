import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';

export const MyPhase: React.FC = () => {
  const { state } = useAppContext();

  const phases = [
    { name: 'Preparation', desc: 'Weeks to months before exam' },
    { name: 'Pre-exam', desc: '7 days out' },
    { name: 'Exam day', desc: 'The big day' },
    { name: 'Post-exam', desc: 'Decompression' },
    { name: 'Waiting for results', desc: 'Managing uncertainty' },
  ];

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand-purple tracking-tight">My Phase</h1>
        <p className="text-brand-text-muted text-sm mt-1 font-medium">
          {state.examDetails.date ? `Exam on ${format(new Date(state.examDetails.date), 'MMM d, yyyy')}` : 'No exam date set'}
        </p>
      </header>

      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isActive = state.currentPhase === phase.name;
          const isPast = phases.findIndex(p => p.name === state.currentPhase) > index;

          return (
            <div
              key={phase.name}
              className={`p-6 rounded-[2rem] transition-all ${
                isActive
                  ? 'bg-brand-purple text-white shadow-[0_20px_50px_rgba(45,27,105,0.06)]'
                  : isPast
                  ? 'glass-panel opacity-60'
                  : 'glass-panel'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-bold ${isActive ? 'text-white' : 'text-brand-purple'}`}>
                    {phase.name}
                  </h3>
                  <p className={`text-sm mt-1 ${isActive ? 'text-white/70' : 'text-brand-text-muted'}`}>
                    {phase.desc}
                  </p>
                </div>
                {isActive && (
                  <span className="bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>
              
              {isActive && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-brand-gold mb-3 uppercase tracking-widest">Recommended Actions:</h4>
                  <ul className="list-disc list-inside text-sm text-white/90 space-y-2">
                    <li>Core recordings (5-3-5, PMR)</li>
                    <li>Worksheet: Identify Your Gremlin</li>
                    <li>Study Strategy Guidance</li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

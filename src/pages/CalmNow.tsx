import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Disclaimer } from '../components/Disclaimer';

export const CalmNow: React.FC = () => {
  const navigate = useNavigate();
  const { logAnxiety } = useAppContext();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [preScore, setPreScore] = useState(5);
  const [postScore, setPostScore] = useState(5);
  const [completed, setCompleted] = useState(false);

  const states = [
    { id: 'racing', label: 'Racing thoughts' },
    { id: 'blank', label: 'Blank mind / freezing' },
    { id: 'panic', label: 'Tight chest / panic' },
    { id: 'focus', label: "Can't focus" },
    { id: 'replay', label: "Can't stop replaying" },
    { id: 'sleep', label: 'Need to sleep' },
    { id: 'reset', label: 'Between study blocks reset' },
  ];

  const handleStateSelect = (id: string) => {
    setSelectedState(id);
    setShowOutput(true);
  };

  const handleComplete = () => {
    logAnxiety(postScore);
    setCompleted(true);
    setTimeout(() => {
      navigate('/app/home');
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-24 h-24 text-brand-gold mb-8" />
        <h2 className="text-5xl font-drama font-bold text-brand-purple mb-4">Great job.</h2>
        <p className="text-brand-text-muted text-lg font-medium">You took control. Returning to dashboard...</p>
      </div>
    );
  }

  if (showOutput) {
    return (
      <div className="min-h-screen bg-brand-bg p-6 flex flex-col">
        <button onClick={() => setShowOutput(false)} className="flex items-center text-brand-text-muted mb-6 hover:text-brand-purple transition-colors font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-purple mb-2 tracking-tight">Your Regulation Pack</h2>
            <p className="text-brand-text-muted font-medium">Based on: {states.find(s => s.id === selectedState)?.label}</p>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center space-x-6">
              <button className="bg-brand-gold text-white p-5 rounded-full shadow-[0_15px_30px_-10px_rgba(201,160,48,0.5)] hover:bg-brand-gold-dark hover:scale-[1.03] transition-all">
                <Play className="w-8 h-8 ml-1" />
              </button>
              <div>
                <h3 className="font-bold text-brand-purple text-xl">5-3-5 Breathing</h3>
                <p className="text-sm text-brand-text-muted font-medium mt-1">3 min audio</p>
              </div>
            </div>

            <div className="border-t border-brand-gold/10 pt-6">
              <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-3">Micro Reframe</h4>
              <p className="text-brand-purple font-drama italic text-2xl leading-tight">"This is a stress response, not a threat. I am safe."</p>
            </div>

            <div className="border-t border-brand-gold/10 pt-6">
              <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-3">Physical Cue</h4>
              <p className="text-brand-purple font-medium text-lg">Feet flat on the floor. Drop your shoulders.</p>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8">
            <h4 className="font-bold text-brand-purple mb-6 text-center text-lg">How do you feel now? (1-10)</h4>
            <input
              type="range"
              min="1"
              max="10"
              value={postScore}
              onChange={(e) => setPostScore(Number(e.target.value))}
              className="w-full mb-6 accent-brand-gold"
            />
            <div className="text-center font-bold text-4xl text-brand-gold mb-8">{postScore}</div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleComplete}
                className="flex-1 bg-brand-gold text-white py-4 rounded-2xl font-bold hover:bg-brand-gold-dark transition-colors shadow-lg shadow-brand-gold/20"
              >
                Done
              </button>
              <button
                onClick={() => setSelectedState(null)}
                className="flex items-center justify-center bg-white border border-brand-gold/30 text-brand-gold px-5 rounded-2xl hover:bg-brand-gold/5 transition-colors"
                title="Try something else"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg p-6 flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center text-brand-text-muted mb-8 hover:text-brand-purple transition-colors font-bold">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-5xl font-drama font-bold text-brand-purple mb-4 text-center">Calm Now</h1>
        <p className="text-brand-text-muted text-center mb-12 font-medium text-lg">What's happening right now?</p>

        <div className="grid grid-cols-1 gap-4">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => handleStateSelect(state.id)}
              className="glass-panel rounded-2xl p-5 text-left font-bold text-brand-purple hover:bg-brand-gold/5 hover:border-brand-gold/50 hover:text-brand-gold-dark transition-all text-lg"
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
};

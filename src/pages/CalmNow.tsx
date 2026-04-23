import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Disclaimer } from '../components/Disclaimer';

export const CalmNow: React.FC = () => {
  const navigate = useNavigate();
  const { state: appState, logAnxiety, getTrainingPhase } = useAppContext();
  const [showOutput, setShowOutput] = useState(false);
  const [preScore, setPreScore] = useState(5);
  const [postScore, setPostScore] = useState(5);
  const [completed, setCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup audio on unmount or when leaving output view
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [showOutput]);

  const handleContinue = () => {
    setShowOutput(true);
  };

  const handleComplete = () => {
    logAnxiety(postScore);
    setCompleted(true);
    setTimeout(() => {
      navigate('/app/home');
    }, 2000);
  };

  const getEngineState = (score: number) => {
    if (score >= 8) return { id: 'A', name: 'State A - Acute Reset', label: 'High Intensity' };
    if (score >= 5) return { id: 'B', name: 'State B - Steady & Refocus', label: 'Moderate Intensity' };
    return { id: 'C', name: 'State C - Performance Tune-Up', label: 'Low Intensity' };
  };

  const engineState = getEngineState(preScore);
  const trainingPhase = getTrainingPhase();
  const timelinePhase = appState.currentPhase;

  const getAudioForState = () => {
    if (engineState.id === 'A') {
      if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A1_v1.0%20TP1%20Stabilization%20Focus.m4a';
      if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A2_v1.0%20TP2%20Regulation%20Focus.mp3';
      return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A3_v1.0%20TP3%20Execution%20Focus.m4a';
    }
    if (engineState.id === 'B') {
      if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B1_v1.0%20TP1%20Stability%20Building.m4a';
      if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B2_v1.0%20TP2%20Interference%20Interruption.m4a';
      return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B3_v1.0%20TP3%20Efficient%20Execution%20Reset.m4a';
    }
    // State C
    if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C1_v1.0%20TP1%20Capacity%20Building.m4a';
    if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C2_v1.0%20TP2%20Performance%20Imagery-Regulated%20Under%20Pressure.m4a';
    return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C3_v1.0%20TP3%20Execution%20Identity%20Rehearsal.m4a';
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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
        <button onClick={() => { setShowOutput(false); setIsPlaying(false); }} className="flex items-center text-brand-text-muted mb-6 hover:text-brand-purple transition-colors font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-purple mb-2 tracking-tight">Your Regulation Pack</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{engineState.name}</span>
              <span className="bg-brand-gold/10 text-brand-gold-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{trainingPhase} Tone</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{timelinePhase}</span>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
            <>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={toggleAudio}
                  className="bg-brand-gold text-white p-5 rounded-full shadow-[0_15px_30px_-10px_rgba(201,160,48,0.5)] hover:bg-brand-gold-dark hover:scale-[1.03] transition-all"
                >
                  {isPlaying ? <Pause className="w-8 h-8 ml-1" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
                <div>
                  <h3 className="font-bold text-brand-purple text-xl">Regulation Audio</h3>
                  <p className="text-sm text-brand-text-muted font-medium mt-1">Focus: {trainingPhase}</p>
                </div>
              </div>
              <audio 
                ref={audioRef} 
                src={getAudioForState()} 
                onEnded={() => setIsPlaying(false)}
              />
            </>

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
                onClick={() => { setShowOutput(false); setIsPlaying(false); setPreScore(5); }}
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
        <p className="text-brand-text-muted text-center mb-8 font-medium text-lg">What is your current activation level?</p>

        <div className="glass-panel rounded-[2.5rem] p-8 space-y-8">
            <div className="text-center space-y-2">
                <div className="text-7xl font-black text-brand-gold">{preScore}</div>
                <div className="text-brand-purple font-bold uppercase tracking-widest text-sm">
                    {preScore >= 8 ? 'High Intensity' : preScore >= 5 ? 'Moderate Intensity' : 'Low Intensity'}
                </div>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={preScore}
              onChange={(e) => setPreScore(Number(e.target.value))}
              className="w-full mb-6 accent-brand-gold"
            />
            
            <div className="flex justify-between text-xs font-bold text-brand-text-muted uppercase tracking-wider px-1">
                <span>Calm (1)</span>
                <span>Overwhelmed (10)</span>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20 mt-6"
            >
              Continue
            </button>
        </div>
      </div>
      
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
};

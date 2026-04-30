import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Disclaimer } from '../components/Disclaimer';

import { supabase } from '../lib/supabase';

export const CalmNow: React.FC = () => {
  const navigate = useNavigate();
  const { state: appState, logAnxiety, getTrainingPhase } = useAppContext();
  
  // UI States: 'select', 'pre-play', 'playing', 'completion'
  const [uiState, setUiState] = useState<'select' | 'pre-play' | 'playing' | 'completion'>('select');
  
  const [preScore, setPreScore] = useState(5);
  const [postScore, setPostScore] = useState(5);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleContinue = () => {
    setUiState('pre-play');
  };

  const handleComplete = async () => {
    logAnxiety(postScore);
    
    // Save to Supabase
    if (appState.session?.user) {
      const isComplete = duration > 0 && currentTime / duration >= 0.8;
      
      const { error } = await supabase
        .from('calm_now_logs')
        .insert({
          user_id: appState.session.user.id,
          pre_score: preScore,
          post_score: postScore,
          engine_state: getEngineState(preScore).id,
          training_phase: getTrainingPhase(),
          duration: Math.floor(currentTime),
          completion_status: isComplete,
        });

      if (error) {
        console.error("Failed to save Calm Now log:", error);
      }
    }

    navigate('/app/home');
  };

  const getEngineState = (score: number) => {
    if (score >= 8) return { id: 'A', name: 'State A - Acute Reset', label: 'Acute Reset' };
    if (score >= 5) return { id: 'B', name: 'State B - Steady & Refocus', label: 'Steady & Refocus' };
    return { id: 'C', name: 'State C - Performance Tune-Up', label: 'Performance Tune-Up' };
  };

  const engineState = getEngineState(preScore);
  const trainingPhase = getTrainingPhase();
  const timelinePhase = appState.currentPhase;

  const getTrainingFocus = () => {
    if (trainingPhase === 'TP1') return 'Stabilization';
    if (trainingPhase === 'TP2') return 'Regulation';
    return 'Execution';
  };

  const getAudioForState = () => {
    if (engineState.id === 'A') {
      if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A1_v1.0%20TP1%20Stabilization%20Focus%20(1).mp3';
      if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A2_v1.0%20TP2%20Regulation%20Focus%20(1).mp3';
      return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20A/A3_v1.0%20TP3%20Execution%20Focus%20(1).mp3';
    }
    if (engineState.id === 'B') {
      if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B1_v1.0%20TP1%20Stability%20Building.mp3';
      if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B2_v1.0%20TP2%20Interference%20Interruption.mp3';
      return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20B/B3_v1.0%20TP3%20Efficient%20Execution%20Reset.mp3';
    }
    // State C
    if (trainingPhase === 'TP1') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C1_v1.0%20TP1%20Capacity%20Building.mp3';
    if (trainingPhase === 'TP2') return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C2_v1.0%20TP2%20Performance%20Imagery-Regulated%20Under%20Pressure.mp3';
    return 'https://pjqbvfpzidqupuaiaqdy.supabase.co/storage/v1/object/public/audio/Calm%20Now/State%20C/C3_v1.0%20TP3%20Execution%20Identity%20Rehearsal.mp3';
  };

  const getCopyForState = () => {
    if (engineState.id === 'A') {
      if (trainingPhase === 'TP1') return {
        title: 'Acute Reset - Stabilization',
        bestFor: 'High activation, panic, or racing thoughts.',
        reframe: 'You\'re activated. Stabilize first.',
        physicalCue: 'Feet flat. Drop your shoulders.',
        expandedText: 'This reset is for moments of strong activation. The goal is not to think your way out of it. The goal is to help your system slow down and regain control.'
      };
      if (trainingPhase === 'TP2') return {
        title: 'Acute Reset - Regulation',
        bestFor: 'Pressure, mental flooding, or rising panic.',
        reframe: 'Pressure is here. Slow down first.',
        physicalCue: 'Unclench your jaw. Lower your shoulders.',
        expandedText: 'This reset is for moments when pressure is starting to overwhelm focus. Slow the body first, then narrow attention to the next step.'
      };
      return {
        title: 'Acute Reset - Execution',
        bestFor: 'High activation before returning to performance.',
        reframe: 'Reset. Then return.',
        physicalCue: 'Still your body. Loosen your hands.',
        expandedText: 'This reset is for moments of sharp activation when you need to regain control quickly and return to execution.'
      };
    }
    if (engineState.id === 'B') {
      if (trainingPhase === 'TP1') return {
        title: 'Steady & Refocus - Stabilization',
        bestFor: 'Moderate activation, fogginess, or drift.',
        reframe: 'Pressure is not danger.',
        physicalCue: 'Feel both feet on the floor.',
        expandedText: 'This reset is for moments when you are activated enough to lose steadiness, but not fully flooded. The goal is to settle and refocus.'
      };
      if (trainingPhase === 'TP2') return {
        title: 'Steady & Refocus - Regulation',
        bestFor: 'Interference, overthinking, or scattered focus.',
        reframe: 'You can feel pressure and still perform.',
        physicalCue: 'Relax your shoulders. Soften your face.',
        expandedText: 'This reset is for moments when worry, pressure, or interference is pulling attention away from the task. The goal is to regain clear focus.'
      };
      return {
        title: 'Steady & Refocus - Execution',
        bestFor: 'Drifting, second-guessing, or losing target.',
        reframe: 'One target. One step.',
        physicalCue: 'Sit tall. Eyes soft. Breath steady.',
        expandedText: 'This reset is for moments when you are starting to drift or scatter and need to return to deliberate execution.'
      };
    }
    // State C
    if (trainingPhase === 'TP1') return {
      title: 'Performance Tune-Up - Stabilization',
      bestFor: 'Calm practice and building steadiness.',
      reframe: 'Repetition builds control.',
      physicalCue: 'Lengthen your spine. Let your breath open.',
      expandedText: 'This reset is for calmer moments when you are building steadiness and reinforcing regulation before stress rises.'
    };
    if (trainingPhase === 'TP2') return {
      title: 'Performance Tune-Up - Regulation',
      bestFor: 'Calm focus and steady preparation.',
      reframe: 'Steady and clear can exist together.',
      physicalCue: 'Drop your shoulders. Let your hands rest.',
      expandedText: 'This reset is for moments when you are relatively steady and want to reinforce calm, focus, and controlled preparation.'
    };
    return {
      title: 'Performance Tune-Up - Execution',
      bestFor: 'Readiness, focus, and controlled performance.',
      reframe: 'Clear. Controlled. Execute.',
      physicalCue: 'Sit tall. Ground your feet.',
      expandedText: 'This reset is for moments when you are already fairly steady and want to reinforce an execution-ready state.'
    };
  };

  const copy = getCopyForState();

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (uiState === 'playing') {
        audioRef.current.pause();
        setUiState('pre-play');
      } else {
        audioRef.current.play();
        setUiState('playing');
      }
    }
  };

  const renderContent = () => {
    if (uiState === 'completion') {
      return (
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8 animate-in fade-in duration-300">
          <div className="text-center">
            <CheckCircle2 className="w-20 h-20 text-brand-gold mx-auto mb-6" />
            <h2 className="text-5xl font-drama font-bold text-brand-purple mb-4">Reset Complete</h2>
            <p className="text-brand-text-muted text-lg font-medium">You've completed your reset.</p>
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
            
            <div className="space-y-3">
              <button
                onClick={handleComplete}
                className="w-full bg-brand-gold text-white py-4 rounded-2xl font-bold hover:bg-brand-gold-dark transition-colors shadow-lg shadow-brand-gold/20"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => { setUiState('select'); setPreScore(5); setPostScore(5); setCurrentTime(0); }}
                className="w-full bg-white border border-brand-gold/30 text-brand-gold py-4 rounded-2xl font-bold hover:bg-brand-gold/5 transition-colors"
              >
                Use Another Reset
              </button>
              <button
                onClick={() => navigate('/app/phase')}
                className="w-full text-brand-text-muted font-medium py-2 hover:text-brand-purple transition-colors text-sm"
              >
                Go to My Phase
              </button>
            </div>
            <p className="text-center text-brand-text-muted mt-6 text-sm italic">
              {preScore <= 5 ? "Steady enough is enough. Keep going." : "Return to the next step with less interference."}
            </p>
          </div>
        </div>
      );
    }

    if (uiState === 'pre-play' || uiState === 'playing') {
      const isPlaying = uiState === 'playing' && !audioRef.current?.paused;
      
      return (
        <div className="flex-1 flex flex-col w-full max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-drama font-bold text-brand-purple">Calm Now</h1>
            <p className="text-brand-text-muted font-medium mt-1">A quick reset for right now</p>
          </div>


          <div className="glass-panel rounded-[2.5rem] p-6 space-y-5 shadow-xl shadow-brand-gold/5">
            <div className="text-center">
              <h3 className="text-sm font-bold text-brand-gold uppercase tracking-widest">{engineState.label}</h3>
              <h2 className="text-2xl font-bold text-brand-purple mt-1">{copy.title}</h2>
              <p className="text-brand-text-muted text-sm mt-1">{duration > 0 ? formatTime(duration) : '2-3 min'} audio</p>
            </div>

            <div className="bg-brand-purple/5 rounded-2xl p-4">
              <p className="text-sm text-brand-purple">
                <span className="font-bold">Best for: </span>{copy.bestFor}
              </p>
            </div>

            <div className="border-t border-brand-gold/10 pt-4">
              <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-2">Micro Reframe</h4>
              <p className="text-brand-purple font-drama italic text-xl leading-tight">"{copy.reframe}"</p>
            </div>

            <div className="border-t border-brand-gold/10 pt-4">
              <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-2">Physical Cue</h4>
              <p className="text-brand-purple font-medium">{copy.physicalCue}</p>
            </div>

          </div>

          <audio 
            ref={audioRef} 
            src={getAudioForState()} 
            onEnded={() => setUiState('pre-play')}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          />

          {uiState === 'pre-play' ? (
            <div className="space-y-3">
              <button
                onClick={toggleAudio}
                className="w-full bg-brand-gold text-white py-4 rounded-2xl font-bold hover:bg-brand-gold-dark transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center text-lg"
              >
                <Play className="w-5 h-5 mr-2" /> Start Reset
              </button>
              <button
                onClick={() => { setUiState('select'); setPreScore(5); setCurrentTime(0); }}
                className="w-full bg-white border border-brand-gold/30 text-brand-gold py-4 rounded-2xl font-bold hover:bg-brand-gold/5 transition-colors"
              >
                Try a different reset
              </button>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 space-y-4 shadow-xl border border-brand-gold/20 animate-in slide-in-from-bottom-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleAudio}
                  className="bg-brand-gold text-white p-4 rounded-full shadow-lg hover:bg-brand-gold-dark transition-all shrink-0"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-brand-gold/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-gold transition-all duration-300"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-bold text-brand-text-muted">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-brand-text-muted font-medium">Audio continues if you leave the app</p>

              <div className="pt-2">
                <button
                  onClick={() => setUiState('completion')}
                  className="w-full bg-brand-purple text-white py-3 rounded-xl font-bold hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20"
                >
                  End Reset
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default 'select' state
    return (
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-5xl font-drama font-bold text-brand-purple mb-4 text-center">Calm Now</h1>
        <p className="text-brand-text-muted text-center mb-8 font-medium text-lg">What is your current activation level?</p>

        <div className="glass-panel rounded-[2.5rem] p-8 space-y-8 shadow-xl shadow-brand-gold/5">
            <div className="text-center space-y-2">
                <div className="text-7xl font-black text-brand-gold">{preScore}</div>
                <div className="text-brand-purple font-bold uppercase tracking-widest text-sm">
                    {engineState.label}
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
              className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20 mt-6 text-lg"
            >
              Continue
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6 flex flex-col">
      <button 
        onClick={() => {
          if (uiState === 'select' || uiState === 'completion') {
            navigate(-1);
          } else {
            setUiState('select');
            if (audioRef.current) audioRef.current.pause();
          }
        }} 
        className="flex items-center text-brand-text-muted mb-8 hover:text-brand-purple transition-colors font-bold w-fit"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {renderContent()}
      
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
};

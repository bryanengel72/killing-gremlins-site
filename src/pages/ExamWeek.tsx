import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, AlertCircle, CheckCircle2, ChevronRight, Play, AlertOctagon, Sun, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Disclaimer } from '../components/Disclaimer';
import { supabase } from '../lib/supabase';

type Stage = 'Consolidation' | 'Narrowing' | 'Preservation' | 'Execution';

interface StageData {
  title: string;
  shortDesc: string;
  executiveBrief: string;
  guardrails: string[];
  ifThen: { condition: string; action: string }[];
  expandedBrief: string;
}

const STAGES: Record<Stage, StageData> = {
  'Consolidation': {
    title: 'Consolidation',
    shortDesc: 'Protect what is already working.',
    executiveBrief: 'You are consolidating now, not reinventing. Protect what is already working. Steady is better than intense this week.',
    guardrails: [
      'No new major resources',
      'No major changes to your plan',
      'Keep your usual rhythm',
      'Complete one reset today'
    ],
    ifThen: [
      { condition: 'If anxiety rises', action: 'use Calm Now A' },
      { condition: 'If you want to overhaul everything', action: 'return to your current plan' },
      { condition: 'If you start overstudying', action: 'shorten the block and narrow focus' }
    ],
    expandedBrief: 'This is the phase to protect what is already working. Avoid major strategy changes, avoid adding new resources, and resist the urge to suddenly increase intensity. Your goal is not to do more. Your goal is to stay steady enough to perform clearly.'
  },
  'Narrowing': {
    title: 'Narrowing',
    shortDesc: 'Reduce noise and switching.',
    executiveBrief: 'Reduce noise. Reduce switching. Focus on key errors and high-yield review, not everything.',
    guardrails: [
      'No new resources',
      'Review errors and high-yield priorities only',
      'Reduce switching between tools and topics',
      'Avoid high-anxiety discussion spaces'
    ],
    ifThen: [
      { condition: 'If rumination rises', action: 'use Calm Now B' },
      { condition: 'If confidence drops', action: 'review what you already know' },
      { condition: 'If you are bouncing between topics', action: 'choose one priority' }
    ],
    expandedBrief: 'This phase is about narrowing, not expanding. Your job now is to reduce noise, reduce switching, and reduce unnecessary input. You do not need to cover everything. You need to protect clarity.'
  },
  'Preservation': {
    title: 'Preservation',
    shortDesc: 'Logistics, calm, and sleep.',
    executiveBrief: 'Protect tomorrow\'s performance by protecting today\'s stability. Heavy studying is done. Logistics, calm, and sleep matter most.',
    guardrails: [
      'Stop heavy studying by your planned cutoff time',
      'Keep review light and familiar',
      'Confirm exam logistics',
      'Prepare materials and essentials',
      'Prioritize rest and sleep'
    ],
    ifThen: [
      { condition: 'If the urge to cram rises', action: 'take a 5-minute pause' },
      { condition: 'If panic spikes', action: 'use Calm Now A immediately' },
      { condition: 'If you feel restless', action: 'shift to logistics, not more studying' }
    ],
    expandedBrief: 'Your work now is to protect your nervous system, protect your energy, and protect tomorrow\'s execution. Heavy studying is no longer the priority. Logistics, stability, and sleep matter more than squeezing in one more long review session.'
  },
  'Execution': {
    title: 'Execution',
    shortDesc: 'Show up and stay steady.',
    executiveBrief: 'Today is execution, not evaluation. Stay steady, stay deliberate, and return to one question at a time.',
    guardrails: [
      'Eat and hydrate normally',
      'Do not review new material',
      'Arrive early',
      'Avoid comparison conversations',
      'Focus on one question at a time'
    ],
    ifThen: [
      { condition: 'If activation feels very high', action: 'use Calm Now A' },
      { condition: 'If you feel scattered or drifting', action: 'use Calm Now B' },
      { condition: 'If you feel steady and ready', action: 'continue with Calm Now C or begin' }
    ],
    expandedBrief: 'This is not the time to evaluate yourself, compare yourself, or prove anything. Your task is to show up, stay steady, and work one question at a time. You do not need perfect calm. You need enough control to keep returning to the next step.'
  }
};

export const ExamWeek: React.FC = () => {
  const navigate = useNavigate();
  const { getExamWeekStage, state: appState } = useAppContext();
  
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showFullBrief, setShowFullBrief] = useState(false);
  const [cutoffTime, setCutoffTime] = useState('');

  useEffect(() => {
    const stage = getExamWeekStage() as Stage | null;
    // Default to 'Consolidation' if no exam date or far away, just for viewing
    setCurrentStage(stage);
  }, [getExamWeekStage]);

  const logStageAccess = async (stageName: string) => {
    if (appState.session?.user) {
      const { error } = await supabase
        .from('exam_week_logs')
        .insert({
          user_id: appState.session.user.id,
          stage_accessed: stageName,
        });
      if (error) {
        console.error("Failed to save exam week log:", error);
      }
    }
  };

  const handleEnterStage = (stageName: Stage) => {
    setSelectedStage(stageName);
    setShowFullBrief(false);
    logStageAccess(stageName);
  };

  const renderStageSelection = () => {
    const defaultStage: Stage = currentStage || 'Consolidation';
    const data = STAGES[defaultStage];

    return (
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto space-y-6 pt-8 animate-in fade-in duration-300">
        <div className="text-center">
          <h1 className="text-5xl font-drama font-bold text-brand-purple mb-4 tracking-tight">Exam Week</h1>
          <p className="text-brand-text-muted font-medium text-lg">Your focus for today</p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-8 space-y-6 shadow-xl shadow-brand-gold/5 text-center mt-6">
          <div className="inline-block bg-brand-gold/10 text-brand-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Current Stage
          </div>
          <h2 className="text-3xl font-bold text-brand-purple">{data.title}</h2>
          <p className="text-brand-text-muted font-medium text-lg">{data.shortDesc}</p>
          
          <button
            onClick={() => handleEnterStage(defaultStage)}
            className="w-full bg-brand-purple text-white py-4 rounded-2xl font-bold hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20 mt-6 text-lg flex items-center justify-center group"
          >
            Enter Current Stage <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <button
          onClick={() => navigate('/calm-now')}
          className="w-full bg-white border border-brand-gold/30 text-brand-gold py-4 rounded-2xl font-bold hover:bg-brand-gold/5 transition-colors flex items-center justify-center mt-4"
        >
          Open Calm Now
        </button>

        <div className="mt-8">
          <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4 text-center">Or View Another Stage</h3>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(STAGES) as Stage[]).map(s => (
              <button
                key={s}
                onClick={() => handleEnterStage(s)}
                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                  s === defaultStage 
                    ? 'bg-brand-gold text-white shadow-md' 
                    : 'bg-white text-brand-purple border border-brand-purple/10 hover:bg-brand-purple/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSelectedStage = () => {
    if (!selectedStage) return null;
    const data = STAGES[selectedStage];

    return (
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-drama font-bold text-brand-purple">{data.title}</h1>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-6 space-y-6 shadow-xl shadow-brand-gold/5">
          <div className="bg-brand-purple/5 rounded-2xl p-5 border border-brand-purple/10">
            <h4 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" /> Executive Brief
            </h4>
            <p className="text-brand-purple font-medium text-lg leading-snug">{data.executiveBrief}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest pl-2">Behavioral Guardrails</h4>
            <ul className="space-y-2">
              {data.guardrails.map((g, i) => (
                <li key={i} className="flex items-start bg-white p-3 rounded-xl border border-brand-gold/10">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mr-3 mt-0.5" />
                  <span className="text-brand-purple text-sm font-medium">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-brand-gold/10">
            <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest pl-2">If / Then Reset Logic</h4>
            <div className="space-y-2">
              {data.ifThen.map((it, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-brand-purple/10 flex flex-col text-sm">
                  <span className="font-bold text-brand-text-muted mb-1">{it.condition}</span>
                  <span className="text-brand-purple font-bold flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1 rotate-180 text-brand-gold" /> {it.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {selectedStage === 'Preservation' && (
            <div className="pt-4 border-t border-brand-gold/10">
              <h4 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-3">Commitment</h4>
              <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-brand-gold/20">
                <Clock className="w-5 h-5 text-brand-gold" />
                <span className="text-brand-purple text-sm font-bold flex-shrink-0">Stop studying by:</span>
                <input 
                  type="time" 
                  value={cutoffTime}
                  onChange={(e) => setCutoffTime(e.target.value)}
                  className="bg-transparent text-brand-purple font-bold outline-none flex-1" 
                />
              </div>
            </div>
          )}

          <div className="pt-2">
             <button
                onClick={() => setShowFullBrief(!showFullBrief)}
                className="w-full text-brand-text-muted font-medium py-2 hover:text-brand-purple transition-colors text-sm flex items-center justify-center"
              >
                {showFullBrief ? 'Hide expanded brief' : 'Show expanded brief'}
              </button>
              
              {showFullBrief && (
                <div className="mt-4 p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/10 animate-in slide-in-from-top-2">
                  <p className="text-sm text-brand-text-muted leading-relaxed">{data.expandedBrief}</p>
                </div>
              )}
          </div>
        </div>

        {selectedStage === 'Execution' && (
           <div className="mt-6 space-y-4 animate-in slide-in-from-bottom-4">
              <h3 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest text-center">Exam Day Audios</h3>
              
              <button className="w-full bg-white border border-brand-gold/20 hover:border-brand-gold/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all shadow-sm group">
                <Sun className="w-8 h-8 text-brand-gold mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold text-brand-purple mb-1">Morning Grounding</span>
                <span className="text-brand-text-muted text-xs font-medium uppercase tracking-widest">3-5 min</span>
              </button>

              <button className="w-full bg-white border border-brand-purple/20 hover:border-brand-purple/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all shadow-sm group">
                <RefreshCcw className="w-8 h-8 text-brand-purple mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold text-brand-purple mb-1">Between Section Reset</span>
                <span className="text-brand-text-muted text-xs font-medium uppercase tracking-widest">1-2 min</span>
              </button>

              <button className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all shadow-sm group mt-4">
                <AlertOctagon className="w-8 h-8 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold text-red-700 mb-1">Panic Reset</span>
                <span className="text-red-500/70 text-xs font-medium uppercase tracking-widest">1-2 min emergency reset</span>
              </button>
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6 flex flex-col">
      <button 
        onClick={() => {
          if (selectedStage) {
            setSelectedStage(null);
            setShowFullBrief(false);
          } else {
            navigate(-1);
          }
        }} 
        className="flex items-center text-brand-text-muted mb-8 hover:text-brand-purple transition-colors font-bold w-fit"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {selectedStage ? 'Back to Exam Week' : 'Back'}
      </button>

      {selectedStage ? renderSelectedStage() : renderStageSelection()}
      
      <div className="mt-8 pt-8 mt-auto">
        <Disclaimer />
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateUser, updateExamDetails, updateAssessments, calculatePhase } = useAppContext();

  const [name, setName] = useState(state.user?.name || '');
  const [examType, setExamType] = useState(state.examDetails.type || '');
  const [examDate, setExamDate] = useState(state.examDetails.date || '');
  const [focusPattern, setFocusPattern] = useState(state.assessments.focusPattern || '');
  const [tendency, setTendency] = useState(state.assessments.testTakingTendency || '');
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const saveChanges = async () => {
      setSaving(true);
      setError(null);
      setSaved(false);

      try {
        // Update local state
        updateUser({ name });
        updateExamDetails({ type: examType, date: examDate });
        updateAssessments({ focusPattern, testTakingTendency: tendency });
        calculatePhase();

        // Try to persist to Supabase profiles table
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            id: state.authUser?.id,
            name,
            exam_type: examType,
            exam_date: examDate,
            focus_pattern: focusPattern,
            test_taking_tendency: tendency,
            updated_at: new Date().toISOString(),
          });

        if (updateError) {
          console.warn('Profiles table not found or RLS error, falling back to user_metadata');
          // Fallback to Supabase user_metadata
          const { error: metaError } = await supabase.auth.updateUser({
            data: {
              name,
              examDetails: { type: examType, date: examDate },
              assessments: { focusPattern, testTakingTendency: tendency }
            }
          });
          if (metaError) throw metaError;
        }
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (err: any) {
        setError(err.message || 'Failed to save profile');
      } finally {
        setSaving(false);
      }
    };

    const timeoutId = setTimeout(() => {
      saveChanges();
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timeoutId);
  }, [name, examType, examDate, focusPattern, tendency]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto flex flex-col min-h-screen">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-brand-text-muted hover:text-brand-purple transition-colors font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-brand-purple tracking-tight">Profile</h1>
        <div className="w-16 flex justify-end">
          {saving && <span className="text-xs text-brand-text-muted font-medium animate-pulse">Saving...</span>}
          {saved && !saving && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        </div>
      </header>

      <div className="space-y-6 flex-1">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="glass-panel rounded-[2rem] p-6 space-y-4">
          <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4">Personal Info</h2>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Name</label>
            <input
              type="text"
              className="block w-full px-4 py-3 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Email</label>
            <input
              type="email"
              disabled
              className="block w-full px-4 py-3 text-base border border-brand-gold/10 text-brand-text-muted/60 rounded-xl bg-white/40 cursor-not-allowed"
              value={state.user?.email || ''}
            />
            <p className="text-xs text-brand-text-muted mt-1">Email cannot be changed.</p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 space-y-4">
          <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4">Exam Details</h2>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Exam Type</label>
            <select
              className="block w-full px-4 py-3 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Step1">USMLE Step 1</option>
              <option value="Step2">USMLE Step 2</option>
              <option value="COMLEX">COMLEX</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Exam Date</label>
            <input
              type="date"
              className="block w-full px-4 py-3 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6 space-y-4">
          <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4">Your Tendencies</h2>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Focus Pattern</label>
            <select
              className="block w-full px-4 py-3 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
              value={focusPattern}
              onChange={(e) => setFocusPattern(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="visual">Visual</option>
              <option value="audio">Audio</option>
              <option value="text">Text</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-purple mb-2">Test-Taking Tendency</label>
            <select
              className="block w-full px-4 py-3 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
              value={tendency}
              onChange={(e) => setTendency(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="overthinker">Overthinker</option>
              <option value="freezer">Freezer</option>
              <option value="rusher">Rusher</option>
              <option value="perfectionist">Perfectionist</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-4 px-4 border border-red-200 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

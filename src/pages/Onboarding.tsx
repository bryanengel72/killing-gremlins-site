import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Disclaimer } from '../components/Disclaimer';
import { supabase } from '../lib/supabase';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updateExamDetails, updateAssessments, calculatePhase } = useAppContext();
  const [step, setStep] = useState(1);

  const [examType, setExamType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [anxietyScore, setAnxietyScore] = useState(5);
  const [confidenceScore, setConfidenceScore] = useState<number>(5);
  const [adhdScreener, setAdhdScreener] = useState<boolean | null>(null);
  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    if (step === 1 && !consent) {
      alert('Please accept the terms to continue.');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      setSaving(true);
      try {
        // Update local state
        updateExamDetails({ type: examType, date: examDate });
        updateAssessments({
          anxietySliderScore: anxietyScore,
          confidenceScore,
          adhdScreener,
        });
        calculatePhase();

        // Try to persist to Supabase profiles table
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            id: state.authUser?.id,
            name: state.user?.name,
            exam_type: examType,
            exam_date: examDate,
            anxiety_slider_score: anxietyScore,
            confidence_score: confidenceScore,
            adhd_screener: adhdScreener,
            updated_at: new Date().toISOString(),
          });

        if (updateError) {
          console.warn('Profiles table not found or RLS error, falling back to user_metadata');
          // Fallback to user_metadata
          const { error: metaError } = await supabase.auth.updateUser({
            data: {
              examDetails: { type: examType, date: examDate },
              assessments: { 
                anxietySliderScore: anxietyScore,
                confidenceScore, 
                adhdScreener 
              }
            }
          });
          if (metaError) throw metaError;
        }

        // Navigate to WTAS baseline test instead of home
        navigate('/test-anxiety-scale');
      } catch (err) {
        console.error('Failed to save onboarding data:', err);
        alert('Failed to save your details. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-[2.5rem]">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-purple tracking-tight">Welcome to Killing Gremlins</h2>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                This app is an educational performance regulation platform. It is not therapy, not a diagnostic tool, and not for emergency care.
              </p>
              <div className="flex items-start bg-white/50 p-4 rounded-xl border border-brand-gold/20">
                <div className="flex items-center h-5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="focus:ring-brand-gold h-5 w-5 text-brand-gold border-brand-gold/30 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="font-medium text-brand-purple">
                    I understand and agree to the terms and privacy policy.
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-purple tracking-tight">Exam Details</h2>
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
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-purple tracking-tight">Baseline Anxiety</h2>
              <p className="text-sm text-brand-text-muted leading-relaxed">On a scale of 1-10, how anxious do you feel about your upcoming exam?</p>
              <input
                type="range"
                min="1"
                max="10"
                value={anxietyScore}
                onChange={(e) => setAnxietyScore(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
              <div className="text-center font-bold text-4xl text-brand-gold">{anxietyScore}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-purple tracking-tight">Your Confidence</h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-brand-purple mb-2">
                  On a scale of 1-10, how confident do you feel about your upcoming exam?
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={confidenceScore}
                  onChange={(e) => setConfidenceScore(Number(e.target.value))}
                  className="w-full accent-brand-gold"
                />
                <div className="text-center font-bold text-4xl text-brand-gold">{confidenceScore}</div>
              </div>

              <div className="pt-6 border-t border-brand-purple/10">
                <label className="block text-sm font-bold text-brand-purple mb-4">
                  Optional: Have you ever been diagnosed with ADHD or do you struggle significantly with executive function?
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAdhdScreener(true)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-colors ${
                      adhdScreener === true
                        ? 'bg-brand-purple text-white'
                        : 'bg-white border border-brand-purple/20 text-brand-purple hover:bg-brand-purple/5'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAdhdScreener(false)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-colors ${
                      adhdScreener === false
                        ? 'bg-brand-purple text-white'
                        : 'bg-white border border-brand-purple/20 text-brand-purple hover:bg-brand-purple/5'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={saving}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-gold/20 text-sm font-bold text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : step === 4 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <Disclaimer />
      </div>
    </div>
  );
};

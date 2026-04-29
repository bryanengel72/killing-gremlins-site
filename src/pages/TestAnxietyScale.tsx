import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  "The closer I am to a major exam, the harder it is for me to concentrate on the material.",
  "When I study, I worry that I will not remember the material on the exam.",
  "During important exams, I think that I am doing awful or that I may fail.",
  "I lose focus on important exams, and I cannot remember material that I knew before the exam.",
  "I finally remember the answer to exam questions after the exam is already over.",
  "I worry so much before a major exam that I am too worn out to do my best on the exam.",
  "I feel out of sorts or not really myself when I take important exams.",
  "I find that my mind sometimes wanders when I am taking important exams.",
  "After an exam, I worry about whether I did well enough.",
  "I struggle with writing assignments, or avoid them as long as I can. I feel that whatever I do will not be good enough."
];

const getCategory = (score: number) => {
  if (score < 2.0) return "Comfortably low test anxiety";
  if (score < 2.5) return "Normal or average test anxiety";
  if (score < 3.0) return "High normal test anxiety";
  if (score < 3.5) return "Moderately high test anxiety";
  if (score < 4.0) return "High test anxiety";
  return "Extremely high test anxiety";
};

export const TestAnxietyScale: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateAssessments } = useAppContext();
  
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultScore, setResultScore] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (qIndex: number, value: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);
    setError("");

    let total = 0;
    Object.values(answers).forEach(val => { total += val; });
    const score = total / 10;
    const cat = getCategory(score);

    setResultScore(score);
    setCategory(cat);
    updateAssessments({ baselineAnxiety: score });

    // Save to Supabase
    if (state.session?.user) {
      // 1. Save the specific test response
      const { error: dbError } = await supabase
        .from('test_anxiety_responses')
        .insert({
          user_id: state.session.user.id,
          total_score: score,
          category: cat,
          scores_json: answers
        });

      if (dbError) {
        console.error("Failed to save to Supabase:", dbError);
        setError("Your local score was calculated, but we could not save it to your profile. Did you create the table in Supabase?");
      }

      // 2. Update user metadata so the app remembers their baseline anxiety for training phases
      const { error: metaError } = await supabase.auth.updateUser({
        data: {
          assessments: {
            ...state.assessments,
            baselineAnxiety: score
          }
        }
      });

      if (metaError) {
        console.error("Failed to update user metadata:", metaError);
      }
    } else {
      setError("You must be logged in to save your score.");
    }
    
    setIsSubmitting(false);
  };

  if (resultScore !== null) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
         <header className="flex items-center gap-4">
          <button onClick={() => navigate('/app/toolbox')} className="text-brand-purple hover:bg-brand-purple/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-brand-purple tracking-tight">Your Results</h1>
          </div>
        </header>

        <div className="glass-panel p-8 rounded-[2rem] text-center space-y-6">
          <div className="inline-block p-4 bg-brand-green/10 rounded-full text-brand-green mb-2">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <h2 className="text-5xl font-black text-brand-purple">{resultScore.toFixed(1)}</h2>
          <div className="space-y-2">
            <p className="text-xl font-bold text-brand-purple">{category}</p>
            <p className="text-brand-text-muted">
              {resultScore >= 3.0 
                ? "You are experiencing elevated test anxiety. We highly recommend proceeding through the Learn & Build modules and establishing a Calm Now routine."
                : "Your test anxiety is within normal limits. The tools in this platform can still help you focus and excel!"}
            </p>
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-left border border-red-100 mt-4">
              <strong>Note:</strong> {error}
            </div>
          )}
          <button
            onClick={() => navigate('/app/toolbox')}
            className="w-full btn-solid mt-4"
          >
            Back to Toolbox
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate('/app/toolbox')} className="text-brand-purple hover:bg-brand-purple/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-brand-purple tracking-tight">Test Anxiety Scale</h1>
          <p className="text-brand-text-muted text-sm mt-1 font-medium">Rate how true each statement is for you.</p>
        </div>
      </header>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl space-y-4">
            <p className="font-bold text-brand-purple">{idx + 1}. {q}</p>
            <div className="grid grid-cols-5 gap-2 text-xs font-semibold">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  onClick={() => handleSelect(idx, val)}
                  className={`py-3 rounded-xl border-2 transition-all ${
                    answers[idx] === val 
                      ? 'border-brand-purple bg-brand-purple text-white' 
                      : 'border-brand-purple/10 text-brand-text hover:border-brand-purple/30 bg-white/50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-brand-text-muted px-1 uppercase tracking-wider font-bold">
              <span>Never True</span>
              <span>Always True</span>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={!isComplete || isSubmitting}
          className="w-full btn-solid disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 py-4 shadow-lg shadow-brand-purple/20"
        >
          <span>{isSubmitting ? 'Calculating...' : 'See Results'}</span>
          {!isSubmitting && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

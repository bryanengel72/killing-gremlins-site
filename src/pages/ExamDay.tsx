import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, RefreshCcw, AlertOctagon } from 'lucide-react';
import { Disclaimer } from '../components/Disclaimer';

export const ExamDay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-purple-dark text-white p-6 flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center text-white/50 mb-8 hover:text-white transition-colors font-bold">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Exit Exam Day Mode
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-6">
        <h1 className="text-5xl font-drama font-bold text-center mb-8 tracking-tight text-brand-gold-light">Exam Day</h1>

        <button className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-all shadow-lg backdrop-blur-md">
          <Sun className="w-12 h-12 text-brand-gold mb-4" />
          <span className="text-2xl font-bold mb-2">Morning Grounding</span>
          <span className="text-white/50 text-sm font-medium uppercase tracking-widest">3-5 min</span>
        </button>

        <button className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-all shadow-lg backdrop-blur-md">
          <RefreshCcw className="w-12 h-12 text-brand-gold-light mb-4" />
          <span className="text-2xl font-bold mb-2">Between Section Reset</span>
          <span className="text-white/50 text-sm font-medium uppercase tracking-widest">1-2 min</span>
        </button>

        <button className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-all shadow-lg backdrop-blur-md mt-8">
          <AlertOctagon className="w-12 h-12 text-red-500 mb-4" />
          <span className="text-2xl font-bold text-red-100 mb-2">I'm Panicking Right Now</span>
          <span className="text-red-300/70 text-sm font-medium uppercase tracking-widest">1-2 min emergency reset</span>
        </button>
      </div>
      
      <div className="mt-8">
        <Disclaimer variant="dark" />
      </div>
    </div>
  );
};

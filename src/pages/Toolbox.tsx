import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { XCircle, Play, ClipboardList, ChevronRight } from 'lucide-react';

export const Toolbox: React.FC = () => {
  const { state, unpinFromToolbox } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand-purple tracking-tight">My Toolbox</h1>
        <p className="text-brand-text-muted text-sm mt-1 font-medium">Your personalized quick-access tools</p>
      </header>

      <section>
        <h2 className="text-xl font-bold text-brand-purple mb-4">Assessments</h2>
        <div 
          onClick={() => navigate('/app/test-anxiety-scale')}
          className="glass-panel rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform border border-brand-purple/20 shadow-lg shadow-brand-purple/5"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-brand-purple/10 p-3 rounded-xl text-brand-purple">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
               <span className="font-bold text-brand-purple text-lg block">Westside Test Anxiety Scale</span>
               <span className="text-sm text-brand-text-muted">A valid 10-question measure of anxiety impairment</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-brand-purple" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-purple mb-4">Saved Tools</h2>
        {state.toolbox.pinnedItems.length === 0 ? (
          <div className="glass-panel border-dashed p-10 text-center rounded-[2rem]">
            <p className="text-brand-purple font-bold mb-2">Your toolbox is empty.</p>
            <p className="text-sm text-brand-text-muted">Go to Learn & Build to add tools here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {state.toolbox.pinnedItems.map((item) => (
              <div key={item} className="glass-panel rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-gold/10 p-3 rounded-xl text-brand-gold">
                    <Play className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-brand-purple text-lg">{item}</span>
                </div>
                <button
                  onClick={() => unpinFromToolbox(item)}
                  className="text-brand-text-muted/50 hover:text-red-500 transition-colors"
                  title="Remove from toolbox"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

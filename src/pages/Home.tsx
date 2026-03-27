import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { UserCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const { state, calculatePhase } = useAppContext();

  useEffect(() => {
    calculatePhase();
  }, []);

  const chartData = [
    { name: 'Baseline', score: state.assessments.baselineAnxiety || 0 },
    ...state.logs.anxietyScores.map((log) => ({
      name: format(new Date(log.date), 'MMM d'),
      score: log.score,
    })),
  ];

  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-purple tracking-tight">Dashboard</h1>
          <div className="text-sm font-medium text-brand-text-muted">
            {state.user?.name ? `Hi, ${state.user.name}` : 'Welcome'}
          </div>
        </div>
        <Link 
          to="/app/profile" 
          className="p-2 rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-colors"
          title="Profile Settings"
        >
          <UserCircle className="w-8 h-8" />
        </Link>
      </header>

      {/* Current Phase Card */}
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-2">Current Phase</h2>
        <div className="text-4xl font-drama font-bold text-brand-gold mb-1">{state.currentPhase}</div>
        {state.examDetails.date && (
          <div className="text-sm font-medium text-brand-purple">
            Exam Date: {format(new Date(state.examDetails.date), 'MMMM d, yyyy')}
          </div>
        )}
      </section>

      {/* Today's Recommendation */}
      <section className="bg-brand-purple rounded-[2rem] p-6 text-white shadow-[0_20px_50px_rgba(45,27,105,0.06)]">
        <h2 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Recommended Today</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">Fear & Stress Reframe</h3>
            <p className="text-sm text-white/70">Short video lesson (5 min)</p>
          </div>
          <Link
            to="/app/learn"
            className="bg-brand-gold text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-gold-dark transition-colors shadow-[0_0_10px_#C9A030]"
          >
            Start
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/calm-now"
            className="glass-panel rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:scale-[1.03] transition-transform"
          >
            <span className="text-3xl mb-3">🌬️</span>
            <span className="font-bold text-brand-purple">Calm Now</span>
          </Link>
          <Link
            to="/exam-day"
            className="glass-panel rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:scale-[1.03] transition-transform"
          >
            <span className="text-3xl mb-3">🎯</span>
            <span className="font-bold text-brand-purple">Exam Day Mode</span>
          </Link>
        </div>
      </section>

      {/* Trend Snapshot */}
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-6">Anxiety Trend</h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4A3A8A', fontFamily: 'IBM Plex Mono' }} dy={10} />
              <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4A3A8A', fontFamily: 'IBM Plex Mono' }} dx={-10} />
              <Tooltip
                contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(201,160,48,0.2)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
              />
              <Line type="monotone" dataKey="score" stroke="#C9A030" strokeWidth={3} dot={{ r: 4, fill: '#C9A030', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

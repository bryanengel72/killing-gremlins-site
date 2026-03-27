import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { supabase, hasSupabaseKeys } from '../lib/supabase';
import { Disclaimer } from '../components/Disclaimer';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabaseKeys) {
      setError('Please configure your Supabase Anon Key in the environment variables to reset your password.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-brand-text-muted hover:text-brand-purple transition-colors font-bold w-fit">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-drama font-bold text-brand-purple tracking-tight">Reset Password</h1>
          <p className="text-brand-text-muted font-medium">Enter your email to receive a reset link.</p>
        </div>

        {!hasSupabaseKeys && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl">
            <p className="font-bold mb-1">Supabase Key Missing</p>
            <p>Please add your <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> in the Settings menu to enable authentication.</p>
          </div>
        )}

        {submitted ? (
          <div className="glass-panel rounded-[2rem] p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-brand-purple">Check Your Email</h2>
            <p className="text-brand-text-muted">If an account exists for {email}, we have sent a password reset link.</p>
            <Link to="/login" className="block mt-6 w-full py-4 px-4 border border-brand-gold/30 rounded-xl text-sm font-bold text-brand-gold hover:bg-brand-gold/5 transition-colors">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-8 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-brand-purple mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-gold" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-4 text-base border border-brand-gold/30 text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent rounded-xl bg-white/80"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !hasSupabaseKeys}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-gold/20 text-sm font-bold text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
      
      <div className="mt-auto pt-8">
        <Disclaimer className="mt-8" />
      </div>
    </div>
  );
};

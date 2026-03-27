import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, hasSupabaseKeys } from '../lib/supabase';
import { Disclaimer } from '../components/Disclaimer';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabaseKeys) {
      setError('Please configure your Supabase Anon Key in the environment variables to sign up.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim(),
          }
        }
      });

      if (error) {
        throw error;
      }

      if (!data.session) {
        setError('Please check your email to confirm your account. (If you want to disable this, turn off "Confirm email" in your Supabase Authentication settings).');
        return;
      }

      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-[2.5rem]">
          <div>
            <h2 className="mt-2 text-center text-4xl font-bold text-brand-purple tracking-tight">
              Create your account
            </h2>
          </div>

          {!hasSupabaseKeys && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl">
              <p className="font-bold mb-1">Supabase Key Missing</p>
              <p>Please add your <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> in the Settings menu to enable authentication.</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-brand-gold/30 placeholder-brand-text-muted/60 text-brand-purple rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm bg-white/80"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-brand-gold/30 placeholder-brand-text-muted/60 text-brand-purple rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm bg-white/80"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-brand-gold/30 placeholder-brand-text-muted/60 text-brand-purple rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm bg-white/80"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !hasSupabaseKeys}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors shadow-lg shadow-brand-gold/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-brand-text-muted">Already have an account? </span>
              <Link to="/login" className="font-bold text-brand-gold hover:text-brand-gold-dark transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <Disclaimer />
      </div>
    </div>
  );
};

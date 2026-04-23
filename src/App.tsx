/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { MyPhase } from './pages/MyPhase';
import { Learn } from './pages/Learn';
import { Toolbox } from './pages/Toolbox';
import { Profile } from './pages/Profile';
import { CalmNow } from './pages/CalmNow';
import { ExamDay } from './pages/ExamDay';
import { TermsOfService } from './pages/TermsOfService';
import { DataUseAgreement } from './pages/DataUseAgreement';
import { TestAnxietyScale } from './pages/TestAnxietyScale';
import { SplashScreen } from './pages/SplashScreen';
import { supabase } from './lib/supabase';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAppContext();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(state.session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-purple">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(state.session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-purple">Loading...</div>;
  }

  if (session) {
    return <Navigate to="/app/home" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <SplashScreen />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/data-use-agreement" element={<DataUseAgreement />} />
          
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="home" element={<Home />} />
            <Route path="phase" element={<MyPhase />} />
            <Route path="learn" element={<Learn />} />
            <Route path="toolbox" element={<Toolbox />} />
            <Route path="profile" element={<Profile />} />
            <Route path="test-anxiety-scale" element={<TestAnxietyScale />} />
          </Route>

          <Route path="/calm-now" element={
            <ProtectedRoute>
              <CalmNow />
            </ProtectedRoute>
          } />
          <Route path="/exam-day" element={
            <ProtectedRoute>
              <ExamDay />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

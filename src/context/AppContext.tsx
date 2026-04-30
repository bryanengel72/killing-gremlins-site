import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type Phase = 'Foundation' | 'Consolidation' | 'Performance' | 'Recovery';

interface AnxietyLog {
  date: string;
  score: number;
}

interface AppState {
  session: Session | null;
  authUser: User | null;
  user: {
    name: string;
    email: string;
    accountType: 'individual' | 'institutional';
  } | null;
  examDetails: {
    type: string;
    date: string | null;
  };
  assessments: {
    baselineAnxiety: number | null; // WTAS (1.0 - 5.0)
    anxietySliderScore: number | null; // Slider (1-10)
    confidenceScore: number | null; // Slider (1-10)
    adhdScreener: boolean | null;
  };
  toolbox: {
    pinnedItems: string[];
  };
  logs: {
    anxietyScores: AnxietyLog[];
    confidenceScores: AnxietyLog[];
  };
  currentPhase: Phase;
}

interface AppContextType {
  state: AppState;
  updateUser: (user: Partial<AppState['user']>) => void;
  updateExamDetails: (details: Partial<AppState['examDetails']>) => void;
  updateAssessments: (assessments: Partial<AppState['assessments']>) => void;
  pinToToolbox: (item: string) => void;
  unpinFromToolbox: (item: string) => void;
  logAnxiety: (score: number) => void;
  logConfidence: (score: number) => void;
  calculatePhase: () => void;
  getTrainingPhase: () => 'TP1' | 'TP2' | 'TP3';
  getExamWeekStage: () => 'Consolidation' | 'Narrowing' | 'Preservation' | 'Execution' | null;
}

const initialState: AppState = {
  session: null,
  authUser: null,
  user: null,
  examDetails: {
    type: '',
    date: null,
  },
  assessments: {
    baselineAnxiety: null,
    anxietySliderScore: null,
    confidenceScore: null,
    adhdScreener: null,
  },
  toolbox: {
    pinnedItems: [],
  },
  logs: {
    anxietyScores: [],
    confidenceScores: [],
  },
  currentPhase: 'Foundation',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const syncStateFromSession = async (session: Session | null) => {
    if (!session?.user) {
      setState((prev) => ({
        ...prev,
        session: null,
        authUser: null,
        user: null,
      }));
      return;
    }

    const metadata = session.user.user_metadata || {};
    
    // Optimistically set from metadata first
    setState((prev) => ({
      ...prev,
      session,
      authUser: session.user,
      user: {
        ...prev.user,
        email: session.user.email || '',
        name: metadata.name || session.user.email?.split('@')[0] || '',
        accountType: 'individual'
      },
      examDetails: {
        ...prev.examDetails,
        ...(metadata.examDetails || {})
      },
      assessments: {
        ...prev.assessments,
        ...(metadata.assessments || {})
      }
    }));

    // Then try to fetch from the profiles table if it exists
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profile && !error) {
        setState((prev) => ({
          ...prev,
          user: {
            ...prev.user!,
            name: profile.name || prev.user?.name || '',
          },
          examDetails: {
            ...prev.examDetails,
            type: profile.exam_type || prev.examDetails.type,
            date: profile.exam_date || prev.examDetails.date,
          },
          assessments: {
            ...prev.assessments,
            anxietySliderScore: profile.anxiety_slider_score || prev.assessments.anxietySliderScore,
            confidenceScore: profile.confidence_score || prev.assessments.confidenceScore,
            adhdScreener: profile.adhd_screener !== undefined ? profile.adhd_screener : prev.assessments.adhdScreener,
          }
        }));
      }
    } catch (err) {
      // Table might not exist yet, ignore silently
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncStateFromSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncStateFromSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateUser = (user: Partial<AppState['user']>) => {
    setState((prev) => ({ ...prev, user: { ...prev.user, ...user } as AppState['user'] }));
  };

  const updateExamDetails = (details: Partial<AppState['examDetails']>) => {
    setState((prev) => {
      const newState = { ...prev, examDetails: { ...prev.examDetails, ...details } };
      return newState;
    });
  };

  const updateAssessments = (assessments: Partial<AppState['assessments']>) => {
    setState((prev) => ({ ...prev, assessments: { ...prev.assessments, ...assessments } }));
  };

  const pinToToolbox = (item: string) => {
    setState((prev) => ({
      ...prev,
      toolbox: {
        ...prev.toolbox,
        pinnedItems: [...new Set([...prev.toolbox.pinnedItems, item])],
      },
    }));
  };

  const unpinFromToolbox = (item: string) => {
    setState((prev) => ({
      ...prev,
      toolbox: {
        ...prev.toolbox,
        pinnedItems: prev.toolbox.pinnedItems.filter((i) => i !== item),
      },
    }));
  };

  const logAnxiety = (score: number) => {
    setState((prev) => ({
      ...prev,
      logs: {
        ...prev.logs,
        anxietyScores: [...prev.logs.anxietyScores, { date: new Date().toISOString(), score }],
      },
    }));
  };

  const logConfidence = (score: number) => {
    setState((prev) => ({
      ...prev,
      logs: {
        ...prev.logs,
        confidenceScores: [...prev.logs.confidenceScores, { date: new Date().toISOString(), score }],
      },
    }));
  };

  const calculatePhase = () => {
    if (!state.examDetails.date) return;
    
    const examDate = new Date(state.examDetails.date);
    const today = new Date();
    // Reset time portions for accurate day difference
    examDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let phase: Phase = 'Foundation';
    if (diffDays < 0) {
      phase = 'Recovery';
    } else if (diffDays <= 14) {
      phase = 'Performance';
    } else if (diffDays <= 56) {
      phase = 'Consolidation';
    } else {
      phase = 'Foundation';
    }

    setState((prev) => ({ ...prev, currentPhase: phase }));
  };

  const getTrainingPhase = () => {
    const wtas = state.assessments.baselineAnxiety;
    if (wtas === null || wtas === undefined) return 'TP1'; // Default for MVP if assessment not taken
    if (wtas >= 3.0) return 'TP1';
    if (wtas >= 2.5) return 'TP2';
    return 'TP3';
  };

  const getExamWeekStage = () => {
    if (!state.examDetails.date) return null;
    const examDate = new Date(state.examDetails.date);
    const today = new Date();
    // Reset time portions for accurate day difference
    examDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 5 && diffDays <= 7) return 'Consolidation'; // -7 to -5
    if (diffDays >= 2 && diffDays <= 4) return 'Narrowing'; // -4 to -2
    if (diffDays === 1) return 'Preservation'; // -1
    if (diffDays === 0) return 'Execution'; // morning of
    return null;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
        updateExamDetails,
        updateAssessments,
        pinToToolbox,
        unpinFromToolbox,
        logAnxiety,
        logConfidence,
        calculatePhase,
        getTrainingPhase,
        getExamWeekStage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

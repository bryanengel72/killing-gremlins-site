import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type Phase = 'Preparation' | 'Pre-exam' | 'Exam day' | 'Post-exam' | 'Waiting for results' | 'Results day';

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
    baselineAnxiety: number | null;
    focusPattern: string;
    testTakingTendency: string;
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
    focusPattern: '',
    testTakingTendency: '',
  },
  toolbox: {
    pinnedItems: [],
  },
  logs: {
    anxietyScores: [],
    confidenceScores: [],
  },
  currentPhase: 'Preparation',
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
            focusPattern: profile.focus_pattern || prev.assessments.focusPattern,
            testTakingTendency: profile.test_taking_tendency || prev.assessments.testTakingTendency,
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
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let phase: Phase = 'Preparation';
    if (diffDays < 0) {
      if (diffDays === -1) phase = 'Post-exam';
      else phase = 'Waiting for results';
    } else if (diffDays === 0) {
      phase = 'Exam day';
    } else if (diffDays <= 7) {
      phase = 'Pre-exam';
    } else {
      phase = 'Preparation';
    }

    setState((prev) => ({ ...prev, currentPhase: phase }));
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

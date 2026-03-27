import { createClient } from '@supabase/supabase-js';

// Use the URL provided by the user as the default if the env var isn't set yet
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tizryuqwjrvxssufqwhe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseKeys = !!supabaseAnonKey;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder_key'
);

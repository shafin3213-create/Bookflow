import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
  supabaseUrl !== "https://placeholder.supabase.co" &&
  supabaseAnonKey !== "placeholder-key";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Export configuration status for runtime checks
export const SUPABASE_CONFIGURED = isSupabaseConfigured;
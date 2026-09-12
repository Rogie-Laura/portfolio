import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export type Rating = {
  id: string;
  rating: number;
  created_at: string;
};

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export type Review = {
  id: string;
  reviewer_name: string;
  relationship: string;
  project_name: string | null;
  rating: number;
  message: string;
  created_at: string;
};

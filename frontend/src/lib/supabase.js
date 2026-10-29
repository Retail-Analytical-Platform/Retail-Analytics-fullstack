import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vwvxvyexqvhknovgqtqz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "REMOVED";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


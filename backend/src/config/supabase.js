import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://vwvxvyexqvhknovgqtqz.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dnh2eWV4cXZoa25vdmdxdHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3OTA5NzksImV4cCI6MjEwNDM2Njk3OX0.6SP9qT7C7_sfW3FxQR2BtodjlPqjgFNyDc9s5VX0u0Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from "@supabase/supabase-js"
import type { Database } from "./supabase"

const subabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const supabaseKey: string = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient<Database>(subabaseUrl, supabaseKey)
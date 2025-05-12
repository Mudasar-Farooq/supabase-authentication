import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vtyuwxeyousmiihfulaf.supabase.co'
const supabaseKey = ""
export const supabase = createClient(supabaseUrl, supabaseKey);
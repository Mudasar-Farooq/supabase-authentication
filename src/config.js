import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vtyuwxeyousmiihfulaf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eXV3eGV5b3VzbWlpaGZ1bGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTI1NDAsImV4cCI6MjA2MjAyODU0MH0.srP-8ZF8O3izYkFVlrja2PqKe6SS6sa3maefZxSzPqs"
export const supabase = createClient(supabaseUrl, supabaseKey);
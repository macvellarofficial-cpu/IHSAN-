import { createClient } from '@supabase/supabase-js';

// Hostinger / Supabase environment configuration
const supabaseUrl = 
  process.env.SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL || 
  'https://wnudsaxbunzgnvelwxlb.supabase.co';

const supabaseKey = 
  process.env.SUPABASE_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudWRzYXhidW56Z252ZWx3eGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MDA0OTcsImV4cCI6MjEwMjQ3NjQ5N30.jVCCbZN3i_Qpvd5ihsEtaIFwj5kMrYqIt1wIiCbDkYA';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test query function for verification
export async function getSiteData() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error querying Supabase:', error.message);
    return null;
  }
  return data;
}

export default supabase;

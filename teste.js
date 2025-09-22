import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fupjveuhzsqdhrpphyoo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cGp2ZXVoenNxZGhycHBoeW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNjQ5NzgsImV4cCI6MjA3Mjk0MDk3OH0.jrf7DzgIP56TFY6sEpOp0qIxhuml_Fb7pSyb9G0ruAg'
);

async function testConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Data:', data);
    console.log('Error:', error);
  } catch (err) {
    console.error('Erro de conexão:', err.message);
  }
}

testConnection();

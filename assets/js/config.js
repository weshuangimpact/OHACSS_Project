const SUPABASE_URL = 'https://yhehfucgemxnfrdvpdhw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh';

if (typeof window.supabase === 'undefined') {
    alert('錯誤：Supabase SDK 未載入');
}

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

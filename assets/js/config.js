// 請填入您的 Supabase URL 和 Key
const SUPABASE_URL = "您的_SUPABASE_URL";
const SUPABASE_KEY = "您的_SUPABASE_ANON_KEY";

// 初始化 Client 並掛載到 window 全域變數
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

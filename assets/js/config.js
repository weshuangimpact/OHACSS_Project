// js/config.js
const SUPABASE_URL = 'https://yhehfucgemxnfrdvpdhw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh';

// 確保 SDK 已載入
if (typeof window.supabase === 'undefined') {
    alert('錯誤：Supabase SDK 未載入');
}

// 初始化並導出 client (全域變數)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

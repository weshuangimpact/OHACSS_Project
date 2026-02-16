// js/config.js
// Supabase 連線設定

const SUPABASE_URL = 'https://yhehfucgemxnfrdvpdhw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh';

// 檢查 SDK 是否載入
if (typeof window.supabase === 'undefined') {
    console.error('錯誤：Supabase SDK 未載入，請檢查 HTML head');
}

// 初始化 Client (全域變數)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

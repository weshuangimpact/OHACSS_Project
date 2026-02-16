// ==========================================
// 專案設定檔 (Config)
// ==========================================

// 1. Supabase 連線設定
const SUPABASE_URL = 'https://yhehfucgemxnfrdvpdhw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh'; 

// 2. 初始化 Supabase Client (單例模式)
// 這樣全站都可以透過 window.supabaseClient 呼叫
if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("✅ Supabase 連線已初始化");
} else {
    console.warn("⚠️ 尚未載入 Supabase SDK，請確認 HTML 是否引入 supabase-js");
}

// 3. 初始化 PDFLib (如果有引入的話)
// 讓全站統一使用 window.PDFLib 或 window.PDFDocument
if (typeof PDFLib !== 'undefined') {
    window.PDFDocument = PDFLib.PDFDocument;
    window.StandardFonts = PDFLib.StandardFonts;
    window.rgb = PDFLib.rgb;
    console.log("✅ PDFLib 已就緒");
}

// config.js
// 目的：集中管理 全站共用設定 (資料庫、品牌資訊、頁面路徑)
// 來源參考: [cite: 166, 167]

const AppConfig = {
    // ------------------------------------------------
    // 1. 資料庫連線設定 (Supabase)
    // ------------------------------------------------
    Supabase: {
        URL: 'https://yhehfucgemxnfrdvpdhw.supabase.co',
        KEY: 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh', // 若有安全疑慮建議後續改用環境變數
        BUCKET_NAME: 'staging'
    },

    // ------------------------------------------------
    // 2. 系統品牌資訊 (顯示於 Navbar / Footer)
    // ------------------------------------------------
    System: {
        APP_NAME: 'OHACSS 職業健康評鑑與合規支援系統',
        COMPANY_NAME: '可信智慧整合有限公司',
        TAX_ID: '42917004',
        SLOGAN: 'WesmartAI , Making Trust Transparent.'
    },

    // ------------------------------------------------
    // 3. 核心頁面路徑對照 (選用，方便 JS 跳轉使用)
    // ------------------------------------------------
    Paths: {
        LOGIN: 'login.html',
        DASHBOARD: 'dashboard.html',
        RESET_PASSWORD: 'reset_password.html',
        INDEX: 'index.html'
    },

    // ------------------------------------------------
    // 4. Storage Keys (避免打錯字)
    // ------------------------------------------------
    StorageKeys: {
        USER_ID: 'currentUserId',
        USER_ROLE: 'currentUserRole',
        USER_NAME: 'currentUserName'
    }
};

// 掛載到 Window 物件，確保全站可存取
window.AppConfig = AppConfig;

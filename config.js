// config.js
const AppConfig = {
    // 1. 資料庫連線設定 (全站共用)
    Supabase: {
        URL: 'https://yhehfucgemxnfrdvpdhw.supabase.co',
        KEY: 'sb_publishable_52emtU-9l-SDxcJTWVTPTA_Yu6qEogh', // 公開金鑰
        BUCKET_NAME: 'staging' // 檔案上傳儲存桶 (僅內頁使用，但放這裡沒問題)
    },

    // 2. 品牌與系統資訊 (Header/Footer 共用)
    System: {
        NAME: 'OHACSS 職業健康評鑑與合規支援系統', // 網頁標題或 Navbar 文字
        COMPANY_NAME: '可信智慧整合有限公司',      // Footer 公司名
        TAX_ID: '42917004',                       // Footer 統編
        SLOGAN: 'WesmartAI , Making Trust Transparent.' // Footer 口號
    },

    // 3. Session 鍵值 (避免打錯字)
    StorageKeys: {
        USER_ID: 'currentUserId',
        USER_ROLE: 'currentUserRole',
        USER_NAME: 'currentUserName'
    }
};

// 掛載到 window 物件，確保全域可存取
window.AppConfig = AppConfig;

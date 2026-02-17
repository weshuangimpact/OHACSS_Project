/**
 * layout.js
 * 目的：負責內頁 (Dashboard 與 功能頁) 的共用版型渲染與權限檢查
 * 依賴：必須先載入 config.js
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 安全檢查：確保 Config 已載入
    if (typeof window.AppConfig === 'undefined') {
        console.error("錯誤：找不到 AppConfig，請確認 config.js 是否已引入");
        return;
    }

    // 2. 權限檢查 (Gatekeeper)
    checkAuth();

    // 3. 渲染共用元件
    renderNavbar();
    renderFooter();

    // 4. 顯示頁面 (原本 CSS 設定 body 為 display:none)
    document.body.style.display = 'flex';

    // 5. 啟動頁首的日期與時鐘
    initHeaderTime();
});

// ==========================================
// 核心功能：權限檢查
// ==========================================
function checkAuth() {
    const userId = sessionStorage.getItem(window.AppConfig.StorageKeys.USER_ID);
    
    // 若無 User ID，踢回登入頁
    if (!userId) {
        // [修正] 確保跳轉至 index.html
        window.location.href = window.AppConfig.Paths.LOGIN || 'index.html';
    }
}

// ==========================================
// 核心功能：渲染導覽列 (Navbar)
// ==========================================
function renderNavbar() {
    // 判斷目前是否在儀表板 (決定是否顯示 "回到儀表板" 按鈕)
    // 使用 config 定義的路徑，若無則預設 'dashboard.html'
    const dashboardPath = window.AppConfig.Paths.DASHBOARD || 'dashboard.html';
    const isDashboard = window.location.pathname.includes(dashboardPath);
    
    // 讀取使用者名稱
    const userName = sessionStorage.getItem(window.AppConfig.StorageKeys.USER_NAME) || '使用者';

    // 根據頁面決定按鈕 HTML
    const backBtnHtml = isDashboard ? '' : `
        <a class="btn btn-outline-light btn-sm me-2" href="${dashboardPath}">
            <i class="fas fa-reply me-1"></i>回到儀表板
        </a>
    `;

    // 組合 HTML (完全保留 index1.html 的 class 與結構)
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark px-4">
        <div class="container-fluid d-flex justify-content-between align-items-center p-0">
            <a class="navbar-brand d-flex align-items-center fw-bold" href="${dashboardPath}">
                <i class="fas fa-shield-alt me-2"></i>
                ${window.AppConfig.System.APP_NAME}
            </a>

            <div class="d-flex align-items-center">
                <span class="text-white me-3 small" id="header-date">
                    <i class="fas fa-spinner fa-spin"></i>
                </span>
                
                <span class="text-white me-4 small border-start ps-3 border-secondary" id="header-clock" style="opacity: 0.9;">
                    --:--
                </span>
                
                <span class="text-white me-4 fw-bold" id="header-user">
                    Hi! ${userName}
                </span>
                
                ${backBtnHtml}
                
                <button class="btn btn-outline-light btn-sm" onclick="logoutSystem()">
                    <i class="fas fa-sign-out-alt me-1"></i>登出
                </button>
            </div>
        </div>
    </nav>`;

    // 插入到 Body 最上方
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
}

// ==========================================
// 核心功能：渲染頁尾 (Footer)
// ==========================================
function renderFooter() {
    const companyInfo = `${window.AppConfig.System.COMPANY_NAME} ${window.AppConfig.System.TAX_ID}`;
    const slogan = window.AppConfig.System.SLOGAN;

    const footerHTML = `
    <footer>
        <div class="mb-1">${companyInfo}</div>
        <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
            ${slogan}
        </div>
    </footer>`;

    // 插入到 Body 最下方
    document.body.insertAdjacentHTML("beforeend", footerHTML);
}

// ==========================================
// 輔助功能：時鐘與日期
// ==========================================
function initHeaderTime() {
    // 1. 設定日期 (格式：2026/2/17(二))
    const dateEl = document.getElementById('header-date');
    if (dateEl) {
        const now = new Date();
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        // 注意：getMonth() 是 0-11，所以要 +1
        const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;
        dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
    }

    // 2. 設定時鐘 (每秒更新)
    const updateClock = () => {
        const clockEl = document.getElementById('header-clock');
        if (clockEl) {
            clockEl.textContent = new Date().toLocaleTimeString('zh-TW', { hour12: false });
        }
    };
    
    // 立即執行一次，避免剛載入時有空窗
    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// 全域功能：登出系統
// ==========================================
// 掛載到 window 物件，讓 HTML onclick 可以呼叫
window.logoutSystem = function() {
    if (confirm('確定要登出系統嗎？')) {
        // 清除所有 Session 資料
        sessionStorage.clear();
        // 清除 LocalStorage (若有使用的話，保險起見)
        localStorage.clear();
        
        // [修正] 跳轉回登入頁 (index.html)
        // 優先讀取 Config 設定，若無則使用字串 'index.html'
        window.location.href = window.AppConfig.Paths.LOGIN || 'index.html';
    }
};

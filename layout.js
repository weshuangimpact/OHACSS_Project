/**
 * layout.js
 * 目的：負責內頁 (Dashboard 與 功能頁) 的共用版型渲染、權限檢查與主題載入
 * 依賴：必須先載入 config.js
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 安全檢查：確保 Config 已載入
    if (typeof window.AppConfig === 'undefined') {
        console.error("錯誤：找不到 AppConfig，請確認 config.js 是否已引入");
        return;
    }

    // 2. [新增] 主題載入 (含登入頁強制黑白邏輯)
    initTheme();

    // 3. 權限檢查 (Gatekeeper)
    checkAuth();

    // 4. 渲染共用元件
    renderNavbar();
    renderFooter();

    // 5. 顯示頁面 (原本 CSS 設定 body 為 display:none)
    document.body.style.display = 'flex';

    // 6. 啟動頁首的日期與時鐘
    initHeaderTime();
});

// ==========================================
// [新增] 核心功能：主題載入與管理
// ==========================================
function initTheme() {
    const body = document.body;
    const currentPath = window.location.pathname;
    
    // 定義登入頁面路徑特徵 (根據您的設定)
    // 通常是 index.html, login.html 或是根路徑 /
    const isLoginPage = currentPath.includes('index.html') || 
                        currentPath.includes('login.html') || 
                        currentPath.endsWith('/');

    // 策略 A：如果是登入頁 -> 強制黑白 (不載入任何主題)
    if (isLoginPage) {
        // 移除所有可能殘留的主題 Class，確保回到 CSS :root 的預設黑白樣式
        body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
        console.log('[System] Login Page detected: Enforcing Default Theme (B&W).');
        return; // 直接結束，不讀取 localStorage
    }

    // 策略 B：如果是內部頁面 -> 讀取使用者設定
    const savedTheme = localStorage.getItem('user_theme_pref') || 'default';

    // 若使用者有設定特定主題 (非 default)，則套用
    if (savedTheme !== 'default') {
        body.classList.add(savedTheme);
        console.log(`[System] User Theme Applied: ${savedTheme}`);
    }
}

// ==========================================
// 核心功能：權限檢查
// ==========================================
function checkAuth() {
    // 允許略過權限檢查的頁面
    const currentPath = window.location.pathname;
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        return;
    }

    const userId = sessionStorage.getItem(window.AppConfig.StorageKeys.USER_ID);
    
    // 若無 User ID，踢回登入頁
    if (!userId) {
        window.location.href = window.AppConfig.Paths.LOGIN || 'index.html';
    }
}

// ==========================================
// 核心功能：渲染導覽列 (Navbar)
// ==========================================
function renderNavbar() {
    // 登入頁通常不需要 Navbar，這裡做個簡單防呆
    // 如果您希望登入頁也有 Navbar 但樣式不同，可在此修改，目前維持若有手寫nav則不渲染
    if (document.querySelector('nav.navbar')) return;

    const dashboardPath = window.AppConfig.Paths.DASHBOARD || 'dashboard.html';
    const isDashboard = window.location.pathname.includes(dashboardPath);
    const userName = sessionStorage.getItem(window.AppConfig.StorageKeys.USER_NAME) || '使用者';

    const backBtnHtml = isDashboard ? '' : `
        <a class="btn btn-outline-light btn-sm me-2" href="${dashboardPath}">
            <i class="fas fa-reply me-1"></i>回到儀表板
        </a>
    `;

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

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
}

// ==========================================
// 核心功能：渲染頁尾 (Footer)
// ==========================================
function renderFooter() {
    if (document.querySelector('footer')) return;

    const companyInfo = `${window.AppConfig.System.COMPANY_NAME} ${window.AppConfig.System.TAX_ID}`;
    const slogan = window.AppConfig.System.SLOGAN;

    const footerHTML = `
    <footer>
        <div class="mb-1">${companyInfo}</div>
        <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
            ${slogan}
        </div>
    </footer>`;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
}

// ==========================================
// 輔助功能：時鐘與日期
// ==========================================
function initHeaderTime() {
    const dateEl = document.getElementById('header-date');
    if (dateEl) {
        const now = new Date();
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;
        dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
    }

    const updateClock = () => {
        const clockEl = document.getElementById('header-clock');
        if (clockEl) {
            clockEl.textContent = new Date().toLocaleTimeString('zh-TW', { hour12: false });
        }
    };
    
    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// 全域功能：登出系統
// ==========================================
window.logoutSystem = function() {
    if (confirm('確定要登出系統嗎？')) {
        sessionStorage.clear();
        // localStorage.clear(); // 建議保留 LocalStorage，這樣"記住我"或"主題設定"才不會被清掉
        window.location.href = window.AppConfig.Paths.LOGIN || 'index.html';
    }
};

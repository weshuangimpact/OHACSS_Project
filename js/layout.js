// js/layout.js
// 【核心佈局】負責全站 Header/Footer 渲染
// 修正說明：已將背景色改回原始設定 #202124

const SITE_CONFIG = {
    name: "OHACSS 職業健康評鑑與合規支援系統",
    company: "可信智慧整合有限公司 42917004",
    copyright: "WesmartAI , Making Trust Transparent."
};

function renderLayout() {
    // 判斷是否為登入頁 (index.html) 或根目錄
    // 目的：登入頁不顯示登出按鈕
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('index.html') || path.endsWith('/') || path.endsWith('login.html');

    // A. 渲染 Header (Navbar)
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        // 根據頁面決定是否顯示登出按鈕
        let navButtons = '';
        if (!isLoginPage) {
            navButtons = `
                <button id="btn-logout-nav" class="btn btn-sm btn-outline-light ms-3" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt me-1"></i>登出
                </button>
            `;
        }

        // ★★★ 修正點：背景色改回 #202124 (原始黑色設定) ★★★
        headerEl.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark px-4" style="background-color: #202124 !important;">
            <div class="container-fluid d-flex justify-content-between align-items-center p-0">
                <a class="navbar-brand d-flex align-items-center fw-bold" href="dashboard.html">
                    <i class="fas fa-shield-alt me-2"></i> ${SITE_CONFIG.name}
                </a>
                <div class="d-flex align-items-center">
                    <span class="text-white me-3 small" id="header-date"><i class="fas fa-spinner fa-spin"></i></span>
                    <span class="text-white small border-start ps-3 border-secondary" id="header-clock" style="opacity: 0.9;">--:--</span>
                    ${navButtons}
                </div>
            </div>
        </nav>`;
    }

    // B. 渲染 Footer
    const footerEl = document.getElementById('app-footer');
    if (footerEl) {
        // ★★★ 修正點：背景色改回 #202124 (原始黑色設定) ★★★
        footerEl.innerHTML = `
        <footer class="text-white text-center py-3 mt-auto" style="background-color: #202124 !important; font-size: 0.9rem;">
            <div class="mb-1">${SITE_CONFIG.company}</div>
            <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
                ${SITE_CONFIG.copyright}
            </div>
        </footer>`;
    }

    // C. 啟動共用工具 (時鐘) - 確保 utils.js 已載入
    if (typeof initHeaderDate === 'function') initHeaderDate();
    if (typeof initClock === 'function') initClock();
}

// 確保 DOM 載入後執行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLayout);
} else {
    renderLayout();
}

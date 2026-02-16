// js/layout.js
// 佈局渲染與系統名稱管理

// 1. 系統常數設定 (改名從這裡改，全站生效)
const SITE_CONFIG = {
    name: "OHACSS 職業健康評鑑與合規支援系統",
    shortName: "OHACSS",
    company: "可信智慧整合有限公司 42917004",
    copyright: "WesmartAI , Making Trust Transparent."
};

function renderLayout() {
    // A. 渲染 Header (Navbar)
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        // 使用深色背景 (#2c3e50) 配合內頁風格
        headerEl.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark px-4" style="background-color: #2c3e50;">
            <div class="container-fluid d-flex justify-content-between align-items-center p-0">
                <a class="navbar-brand d-flex align-items-center fw-bold" href="dashboard.html">
                    <i class="fas fa-shield-alt me-2"></i> ${SITE_CONFIG.name}
                </a>
                <div class="d-flex align-items-center">
                    <span class="text-white me-3 small" id="header-date"><i class="fas fa-spinner fa-spin"></i></span>
                    <span class="text-white small border-start ps-3 border-secondary" id="header-clock" style="opacity: 0.9;">--:--</span>
                    <button id="btn-logout-nav" class="btn btn-sm btn-outline-light ms-3" onclick="handleLogout()">
                        <i class="fas fa-sign-out-alt me-1"></i>登出
                    </button>
                </div>
            </div>
        </nav>`;
    }

    // B. 渲染 Footer
    const footerEl = document.getElementById('app-footer');
    if (footerEl) {
        footerEl.innerHTML = `
        <footer class="text-white text-center py-3 mt-auto" style="background-color: #2c3e50; font-size: 0.9rem;">
            <div class="mb-1">${SITE_CONFIG.company}</div>
            <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
                ${SITE_CONFIG.copyright}
            </div>
        </footer>`;
    }

    // C. 啟動共用工具 (時鐘)
    if (typeof initHeaderDate === 'function') initHeaderDate();
    if (typeof initClock === 'function') initClock();
}

// DOM 載入後執行
document.addEventListener('DOMContentLoaded', renderLayout);

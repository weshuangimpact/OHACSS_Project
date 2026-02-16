// js/layout.js
// 【佈局管理】動態生成統一的 Header 與 Footer HTML

const SITE_NAME = "OHACSS 職業健康評鑑與合規支援系統";
const COMPANY_INFO = "可信智慧整合有限公司 42917004";
const COPYRIGHT = "WesmartAI , Making Trust Transparent.";

function renderLayout() {
    // 1. 生成 Header (Navbar)
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        headerEl.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark px-4">
            <div class="container-fluid d-flex justify-content-between align-items-center p-0">
                <a class="navbar-brand d-flex align-items-center fw-bold" href="dashboard.html">
                    <i class="fas fa-shield-alt me-2"></i> ${SITE_NAME}
                </a>
                <div class="d-flex align-items-center">
                    <span class="text-white me-3 small" id="header-date"><i class="fas fa-spinner fa-spin"></i></span>
                    <span class="text-white small border-start ps-3 border-secondary" id="header-clock" style="opacity: 0.9;">--:--</span>
                </div>
            </div>
        </nav>`;
    }

    // 2. 生成 Footer
    const footerEl = document.getElementById('app-footer');
    if (footerEl) {
        footerEl.innerHTML = `
        <footer>
            <div class="mb-1">${COMPANY_INFO}</div>
            <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
                ${COPYRIGHT}
            </div>
        </footer>`;
    }

    // 3. 渲染完成後，啟動 utils.js 中的時鐘功能
    // 確保 initHeaderDate 和 initClock 存在 (由 utils.js 提供)
    if (typeof initHeaderDate === 'function') initHeaderDate();
    if (typeof initClock === 'function') initClock();
}

// 頁面載入後立即執行渲染
document.addEventListener('DOMContentLoaded', renderLayout);

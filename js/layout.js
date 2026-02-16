// js/layout.js
// 負責全站 Header/Footer 渲染與共用功能

const SITE_CONFIG = {
    name: "OHACSS 職業健康評鑑與合規支援系統",
    company: "可信智慧整合有限公司 42917004",
    copyright: "WesmartAI , Making Trust Transparent."
};

function renderLayout() {
    // 1. 渲染 Header (Navbar)
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        headerEl.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark px-4">
            <div class="container-fluid d-flex justify-content-between align-items-center p-0">
                <a class="navbar-brand d-flex align-items-center fw-bold" href="dashboard.html">
                    <i class="fas fa-shield-alt me-2"></i> ${SITE_CONFIG.name}
                </a>
                
                <div class="d-flex align-items-center">
                    <span class="text-white me-3 small" id="header-date">
                        <i class="fas fa-spinner fa-spin"></i>
                    </span>
                    <span class="text-white small border-start ps-3 border-secondary" id="header-clock" style="opacity: 0.9;">
                        --:--
                    </span>
                    
                    <button class="btn btn-sm btn-outline-light ms-3" onclick="logoutSystem()">
                        <i class="fas fa-sign-out-alt me-1"></i> 登出
                    </button>
                </div>
            </div>
        </nav>`;
    }

    // 2. 渲染 Footer
    const footerEl = document.getElementById('app-footer');
    if (footerEl) {
        footerEl.innerHTML = `
        <footer>
            <div class="mb-1">${SITE_CONFIG.company}</div>
            <div class="small opacity-75" style="font-family: 'Segoe UI', sans-serif; letter-spacing: 1px;">
                ${SITE_CONFIG.copyright}
            </div>
        </footer>`;
    }

    // 3. 啟動時鐘與日期 (原 dashboard.html 的 updateClock 邏輯移至此)
    startClock();
}

// 時鐘與日期邏輯
function startClock() {
    function update() {
        const now = new Date();
        const clockEl = document.getElementById('header-clock');
        if(clockEl) {
            clockEl.textContent = now.toLocaleTimeString('zh-TW', { hour12: false });
        }
        
        const dateEl = document.getElementById('header-date');
        if(dateEl) {
            const days = ['日', '一', '二', '三', '四', '五', '六'];
            const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;
            // 避免重複寫入 DOM 造成閃爍，只在變更時更新
            if(!dateEl.getAttribute('data-date') || dateEl.getAttribute('data-date') !== formattedDate) {
                dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
                dateEl.setAttribute('data-date', formattedDate);
            }
        }
    }
    update();
    setInterval(update, 1000);
}

// 全域登出函式 (供按鈕呼叫)
function logoutSystem() {
    if(confirm('確定要登出系統嗎？')) {
        sessionStorage.clear();
        // 假設 index.html 是登入頁
        window.location.href = 'index.html';
    }
}

// 當 DOM 準備好時執行
document.addEventListener('DOMContentLoaded', renderLayout);

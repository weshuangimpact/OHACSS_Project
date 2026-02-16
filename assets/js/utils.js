/**
 * OHACSS 系統共用邏輯
 */

// 1. 初始化頁面佈局 (Navbar & Footer)
async function initLayout() {
    try {
        // 載入 Navbar
        const navEl = document.getElementById('navbar-placeholder');
        if (navEl) {
            const resp = await fetch('components/navbar.html');
            if (resp.ok) navEl.innerHTML = await resp.text();
        }

        // 載入 Footer
        const footEl = document.getElementById('footer-placeholder');
        if (footEl) {
            const resp = await fetch('components/footer.html');
            if (resp.ok) footEl.innerHTML = await resp.text();
        }

        // 啟動全域 UI 功能
        setupGlobalUI();

    } catch (e) {
        console.error("Layout載入失敗:", e);
    }
}

// 2. 權限檢查 (Auth Guard)
function checkAuth() {
    const userId = sessionStorage.getItem('currentUserId');
    // 如果不在登入頁且沒 ID，踢回登入頁
    if (!userId && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    } else {
        // 驗證通過，顯示畫面
        document.body.style.display = 'flex';
    }
}

// 3. 全域 UI 設定 (時鐘、使用者名稱、登出)
function setupGlobalUI() {
    // 設定時鐘
    setInterval(() => {
        const clockEl = document.getElementById('header-clock');
        const dateEl = document.getElementById('header-date');
        const now = new Date();
        
        if (clockEl) {
            clockEl.textContent = now.toLocaleTimeString('zh-TW', { hour12: false });
        }
        if (dateEl) {
            const days = ['日', '一', '二', '三', '四', '五', '六'];
            const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;
            dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${dateStr}`;
        }
    }, 1000);

    // 設定使用者名稱
    const userName = sessionStorage.getItem('currentUserName');
    const userEl = document.getElementById('header-user');
    if (userEl && userName) {
        userEl.innerText = `Hi! ${userName}`;
    }

    // 綁定登出按鈕事件 (使用事件委派，因為 Navbar 是動態載入的)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-btn') {
            e.preventDefault();
            if (confirm('確定要登出系統嗎？')) {
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        }
    });
}

// 頁面載入時自動執行
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initLayout();
});

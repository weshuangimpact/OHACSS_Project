// js/utils.js

// 初始化頁首時鐘與日期
function initHeaderClock() {
    // 1. 時鐘跳動
    setInterval(() => {
        const el = document.getElementById('header-clock');
        if(el) el.textContent = new Date().toLocaleTimeString('zh-TW', { hour12: false });
    }, 1000);
    
    // 2. 日期顯示
    const dateEl = document.getElementById('header-date');
    if(dateEl) {
        const now = new Date();
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;
        dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
    }
}

// 若頁面 DOM 已載入則自動執行
document.addEventListener('DOMContentLoaded', initHeaderClock);

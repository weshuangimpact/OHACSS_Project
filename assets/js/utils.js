// js/utils.js
// 【共用邏輯】日期與時鐘計算 (純邏輯)

function initHeaderDate() {
    const dateEl = document.getElementById('header-date');
    if (!dateEl) return;

    const now = new Date();
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}(${days[now.getDay()]})`;

    dateEl.innerHTML = `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
}

function updateClock() {
    const clockEl = document.getElementById('header-clock');
    if (!clockEl) return;

    clockEl.textContent = new Date().toLocaleTimeString('zh-TW', { hour12: false });
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// 注意：這裡移除了 DOMContentLoaded 監聽，改由 layout.js 呼叫

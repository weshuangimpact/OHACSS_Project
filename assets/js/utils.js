// js/utils.js
// 【共用邏輯】全站統一的 Header 日期與時鐘設定

/**
 * 初始化 Header 日期 (YYYY/MM/DD (週X))
 * 對應元素 ID: header-date
 */
function initHeaderDate() {
    const dateEl = document.getElementById('header-date');
    if (!dateEl) return;

    const now = new Date();
    const days = ['日', '一', '二', '三', '四', '五', '六'];

    // 格式化日期字串
    const formattedDate =
        `${now.getFullYear()}/` +
        `${now.getMonth() + 1}/` +
        `${now.getDate()}` +
        `(${days[now.getDay()]})`;

    // 寫入 HTML (包含圖示與文字)
    dateEl.innerHTML =
        `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
}

/**
 * 更新 Header 時鐘 (HH:MM:SS)
 * 對應元素 ID: header-clock
 */
function updateClock() {
    const clockEl = document.getElementById('header-clock');
    if (!clockEl) return;

    clockEl.textContent =
        new Date().toLocaleTimeString(
            'zh-TW',
            { hour12: false }
        );
}

/**
 * 啟動時鐘計時器
 */
function initClock() {
    updateClock(); // 先執行一次，避免畫面延遲
    setInterval(updateClock, 1000); // 每秒更新
}

// 當 DOM 載入完成後，自動執行上述統一設定
document.addEventListener('DOMContentLoaded', function () {
    initHeaderDate();
    initClock();
});

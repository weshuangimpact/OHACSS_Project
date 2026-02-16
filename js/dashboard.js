// js/dashboard.js
// 儀表板專屬邏輯

document.addEventListener('DOMContentLoaded', async function() {
    // 1. 權限檢查 (Check Auth)
    await checkAuth();

    // 2. 更新歡迎訊息
    updateWelcomeMessage();
});

// 檢查登入狀態
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        // 未登入，踢回首頁
        window.location.href = 'index.html'; 
    }
}

// 更新使用者名稱顯示
function updateWelcomeMessage() {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
        // 優先從 sessionStorage 讀取，若無則顯示預設
        const storedName = sessionStorage.getItem('currentUserName');
        userNameEl.textContent = storedName || '使用者';
    }
}

// 登出功能 (供 layout.js 的按鈕呼叫)
async function handleLogout() {
    if(confirm('確定要登出系統嗎？')) {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('登出失敗:', error);
            alert('登出失敗，請稍後再試');
        } else {
            sessionStorage.clear(); // 清除暫存
            window.location.href = 'index.html'; // 回首頁
        }
    }
}
// 將 handleLogout 綁定到 window 以便 onclick 呼叫
window.handleLogout = handleLogout;

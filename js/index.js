// js/index.js
// 首頁(登入頁) 專屬邏輯

document.addEventListener('DOMContentLoaded', async function() {
    
    // 1. 【自動轉導】檢查是否已登入
    // 若已有 session，直接取代當前歷史紀錄跳轉到 dashboard
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        window.location.replace('dashboard.html');
        return; 
    }

    // 2. 綁定登入表單事件
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// 處理登入動作
async function handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('error-msg');
    
    // 重置狀態
    errorMsg.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>驗證中...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // 使用 js/config.js 的 supabaseClient
        const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (authError) throw new Error('帳號或密碼錯誤');

        // 取得使用者角色資料
        const { data: profileData, error: profileError } = await supabaseClient.from('profiles').select('*').eq('id', authData.user.id).single();
        if (profileError || !profileData) throw new Error('讀取使用者權限失敗');

        // 寫入 SessionStorage
        sessionStorage.setItem('currentUserId', authData.user.id);
        sessionStorage.setItem('currentUserRole', profileData.role || 'user');
        sessionStorage.setItem('currentUserName', profileData.full_name || email);

        btn.innerHTML = '<i class="fas fa-check me-2"></i>登入成功，跳轉中...';
        
        // 延遲跳轉以顯示成功訊息
        setTimeout(() => window.location.href = 'dashboard.html', 500);

    } catch (err) {
        console.error(err);
        document.getElementById('error-text').innerText = err.message;
        errorMsg.style.display = 'block';
        btn.disabled = false;
        btn.innerText = '登入系統';
        
        // 觸發震動特效
        const card = document.querySelector('.login-card');
        if(card) {
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }
    }
}

// 處理忘記密碼 (供 HTML onclick 呼叫)
async function sendReset() {
    const email = document.getElementById('reset-email').value.trim();
    if (!email) return alert('請輸入 Email');
    
    const btn = document.querySelector('#forgotModal .btn-primary');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = '發送中...';

    try {
        // 確保重設密碼後的轉導頁面正確
        const redirectUrl = new URL('reset_password.html', window.location.href).href;

        const { data, error } = await supabaseClient.functions.invoke('reset-password', {
            body: { 
                email: email,
                redirectTo: redirectUrl 
            }
        });
        
        if (error) throw error;
        if (data && data.error) throw new Error(data.error);

        alert('✅ 重設信已發送！\n請至您的信箱收取信件，點擊連結後即可設定新密碼。');
        
        // 關閉 Bootstrap Modal
        const modalEl = document.getElementById('forgotModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if(modalInstance) modalInstance.hide();

    } catch (err) {
        console.error('重設密碼失敗:', err);
        alert('❌ 發送失敗: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
}
// 綁定到 window 確保 onclick 抓得到
window.sendReset = sendReset;

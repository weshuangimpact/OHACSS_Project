document.addEventListener('DOMContentLoaded', function () {

    // 頁首時間
    setInterval(() => {
        const el = document.getElementById('header-clock');
        if (el) {
            el.textContent =
                new Date().toLocaleTimeString('zh-TW', { hour12: false });
        }
    }, 1000);

    const dateEl = document.getElementById('header-date');
    if (dateEl) {
        const now = new Date();
        const days = ['日','一','二','三','四','五','六'];
        const formattedDate =
            `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}(${days[now.getDay()]})`;
        dateEl.innerHTML =
            `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
    }
});

// ===== 登入邏輯 =====

document.getElementById('loginForm')
.addEventListener('submit', async function (e) {

    e.preventDefault();

    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('error-msg');

    errorMsg.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>驗證中...';

    const email =
        document.getElementById('email').value.trim();
    const password =
        document.getElementById('password').value.trim();

    try {

        const { data: authData, error: authError } =
            await window.supabaseClient.auth
                .signInWithPassword({ email, password });

        if (authError) {
            throw new Error('帳號或密碼錯誤');
        }

        const { data: profileData, error: profileError } =
            await window.supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single();

        if (profileError || !profileData) {
            throw new Error('讀取使用者權限失敗');
        }

        sessionStorage.setItem('currentUserId', authData.user.id);
        sessionStorage.setItem('currentUserRole', profileData.role || 'user');
        sessionStorage.setItem('currentUserName', profileData.full_name || email);

        btn.innerHTML =
            '<i class="fas fa-check me-2"></i>登入成功，跳轉中...';

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);

    } catch (err) {

        document.getElementById('error-text').innerText =
            err.message;

        errorMsg.style.display = 'block';
        btn.disabled = false;
        btn.innerText = '登入系統';

        const card = document.querySelector('.login-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
    }
});

// ===== 重設密碼 =====

async function sendReset() {

    const email =
        document.getElementById('reset-email').value.trim();

    if (!email) {
        alert('請輸入 Email');
        return;
    }

    const btn =
        document.querySelector('#forgotModal .btn-primary');
    const originalText = btn.innerText;

    btn.disabled = true;
    btn.innerText = '發送中...';

    try {

        const redirectUrl =
            new URL('reset_password.html',
            window.location.href).href;

        const { data, error } =
            await window.supabaseClient.functions
                .invoke('reset-password', {
                    body: { email, redirectTo: redirectUrl }
                });

        if (error) throw error;
        if (data && data.error)
            throw new Error(data.error);

        alert('重設信已發送！');
        bootstrap.Modal.getInstance(
            document.getElementById('forgotModal')
        ).hide();

    } catch (err) {

        alert('發送失敗: ' + err.message);

    } finally {

        btn.disabled = false;
        btn.innerText = originalText;
    }
}

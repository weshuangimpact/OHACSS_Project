document.addEventListener('DOMContentLoaded', function () {

    document.body.style.display = 'flex';

    const userRole = sessionStorage.getItem('currentUserRole') || 'admin';
    const userName = sessionStorage.getItem('currentUserName') || '管理員';

    const userEl = document.getElementById('header-user');
    if (userEl) userEl.innerText = `Hi! ${userName}`;

    const dateEl = document.getElementById('header-date');
    if (dateEl) {
        const now = new Date();
        const days = ['日','一','二','三','四','五','六'];
        const formattedDate =
            `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}(${days[now.getDay()]})`;
        dateEl.innerHTML =
            `<i class="far fa-calendar-alt me-1"></i>今日是 ${formattedDate}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    const cards = {
        plan: document.getElementById('card-index1'),
        manager: document.getElementById('card-index2'),
        eval: document.getElementById('card-index3'),
        act: document.getElementById('card-index5'),
        maint: document.getElementById('card-index6'),
        master: document.getElementById('card-index7'),
        users: document.getElementById('card-users'),
        profile: document.getElementById('card-profile'),
        service: document.getElementById('card-index4')
    };

    const show = (el) => { if (el) el.style.display = 'block'; }
    const hide = (el) => { if (el) el.style.display = 'none'; }

    if (userRole === 'admin') {
        Object.values(cards).forEach(show);
    }
    else if (userRole === 'doc_control' || userRole === 'general') {
        hide(cards.plan);
        show(cards.manager);
        show(cards.eval);
        hide(cards.act);
        show(cards.maint);
        show(cards.master);
        hide(cards.users);
        show(cards.profile);
        show(cards.service);
    }
    else if (userRole === 'consultant') {
        show(cards.plan);
        hide(cards.manager);
        hide(cards.eval);
        show(cards.act);
        hide(cards.maint);
        hide(cards.master);
        hide(cards.users);
        show(cards.profile);
        show(cards.service);
    }
});

function logoutSystem() {
    if (confirm('確定要登出系統嗎？')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('header-clock');
    if (clockEl) {
        clockEl.textContent =
            now.toLocaleTimeString('zh-TW', { hour12: false });
    }
}

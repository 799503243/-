var API = (function () {
    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';
    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, { headers });
    }
    function post(path, bodyObj) {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, {
            headers,
            method: 'POST',
            body: JSON.stringify(bodyObj),
        });
    }
    /**
     * 注册
     * @param {} UserInfo 账号，昵称，密码
     */
    async function reg(userInfo) {
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
    }

    /**
     * 登录
     * @param {} loginInfo 账号，密码
     */
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
            localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'));
        }
        return result;
    }

    /**
     * 验证账号是否存在
     * @param {} loginId 账号
     */
    async function exists(loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    }

    /**
     * 获取当前的登录信息
     */
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    }

    /**
     * 发送聊天消息
     * @param {} content 消息内容
     */
    async function sendChat(content) {
        const resp = await post('/api/chat', { content });
        return await resp.json();
    }

    /**
     * 获取聊天记录
     */
    async function getHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }
    /**
     * 退出登录
     */
    function loginOut() {
        localStorage.removeItem(TOKEN_KEY);
    }
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
    };
})();

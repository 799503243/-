(async function () {
    //获取需要的dom
    const doms = {
        nick: $('#nickname'),
        id: $('#loginId'),
        close: $('.close i'),
        container: $('.chat-container'),
        txtInput: $('#txtMsg'),
        msg: $('.msg-container'),
    };
    //检查是否登陆
    const resp = await API.profile();
    if (resp.code) {
        alert('未登录或登录已过期！请重新登陆');
        location.href = './login.html';
        return;
    } else {
        doms.nick.innerText = resp.data.nickname;
        doms.id.innerText = resp.data.loginId;
    }
    //退出登录
    doms.close.addEventListener('click', () => {
        API.loginOut();
        location.href = './login.html';
    });
    //加载历史聊天记录
    const message = await API.getHistory();
    for (const chat of message.data) {
        setMessage(chat);
    }
    //发送聊天消息
    doms.msg.addEventListener('submit', e => {
        e.preventDefault();
        addChat(doms.txtInput.value.trim());
        doms.txtInput.value = '';
    });
    function setMessage(messages) {
        const div = $$$('div');
        div.classList.add('chat-item');
        if (messages.from) {
            div.classList.add('me');
        }
        const img = $$$('img');
        img.className = 'chat-avatar';
        img.src = messages.from
            ? './asset/avatar.png'
            : './asset/robot-avatar.jpg';
        const content = $$$('div');
        content.className = 'chat-content';
        content.innerText = messages.content;
        const time = $$$('div');
        time.className = 'chat-date';
        time.innerText = setTime(messages.createdAt);
        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(time);
        doms.container.appendChild(div);
        scrollBottom();
    }
    function setTime(at) {
        const data = new Date(at);
        const year = data.getFullYear();
        const month = (data.getMonth() + 1).toString().padStart(2, '0');
        const day = data.getDate().toString().padStart(2, '0');
        const hour = data.getHours().toString().padStart(2, '0');
        const minute = data.getMinutes().toString().padStart(2, '0');
        const second = data.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    function scrollBottom() {
        doms.container.scrollTop = doms.container.scrollHeight;
    }
    async function addChat(content) {
        setMessage({
            from: message,
            content,
            createdAt: Date.now(),
        });
        const resp = await API.sendChat(content);
        setMessage(resp.data);
    }
})();

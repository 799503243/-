const id = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号';
    }
    const err = await API.exists(val);
    if (err.data) {
        return '该账号已存在，请重新选择一个账号';
    }
});
const nick = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '请填写昵称';
    }
});
const pwd = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请填写密码';
    }
});
const repeatPwd = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请再次填写密码';
    }
    if (val !== pwd.input.value) {
        return '两次密码输入不一致';
    }
});
const form = $('.user-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const resp = await FieldValidator.validata(id, nick, pwd, repeatPwd);
    if (!resp) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const r = await API.reg(data);
    if (r.code === 0) {
        alert('注册成功，点击确定跳转到登录页');
        location.href = './login.html';
    }
});

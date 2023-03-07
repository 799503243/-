const id = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号';
    }
});
const pwd = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请填写密码';
    }
});
const form = $('.user-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const resp = await FieldValidator.validata(id, pwd);
    if (!resp) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const r = await API.login(data);
    if (r.code === 0) {
        location.href = './index.html';
    } else {
        id.p.innerText = '账号或密码错误';
        pwd.input.value = '';
    }
});

function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
function $$$(tagName) {
    return document.createElement(tagName);
}
class FieldValidator {
    constructor(txtId, fn) {
        this.input = $('#' + txtId);
        this.p = this.input.nextElementSibling;
        this.validatorfn = fn;
        this.input.addEventListener('blur', () => this.validata());
    }
    async validata() {
        const err = await this.validatorfn(this.input.value);
        if (err) {
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = '';
            return true;
        }
    }
    static async validata(...validators) {
        const proms = validators.map(s => s.validata());
        const result = await Promise.all(proms);
        return result.every(e => e);
    }
}

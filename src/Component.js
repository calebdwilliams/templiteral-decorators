import { templiteral } from 'templiteral';

function noop() {}

export function template(strings, ...values) {
    return [strings, ...values];
}

export function Component(config) {
    return function componentFactory(target) {
        const connectedCallback = target.prototype.connectedCallback || noop;
        const _render = target.prototype._render;
        target.prototype._templiteral = templiteral.bind(target);

        if (_render) {
            throw new Error('this._render is a reserved method when using this framework.');
        }

        target.prototype._render = function(...args) {
            const template = Reflect.apply(config.template, this, []);
            Reflect.apply(this._templiteral(this, this), this, template);
        }

        target.prototype.connectedCallback = function() {
            Reflect.apply(connectedCallback, this, []);
            this._render();
        }

        customElements.define(config.selector, target);
        return target;
    }
}

import { Component, template } from './Component';
import { Observe } from './observe';

@Component({
    selector: 'my-el',
    template() {
        return template`
            <h1>This is not going to be easy</h1>
            <p>Will you be my ${this.data}?</p>
        `;
    }
})
class MyEl extends HTMLElement {
    @Observe data = 'friend';
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}

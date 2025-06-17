// Radial Progress Bar Web Component
class RadialProgress extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'max', 'label', 'color', 'size'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <link rel="stylesheet" href="radial-progress.css">
            <div class="radial-progress-container">
                <svg viewBox="0 0 36 36" class="circular-chart">
                    <circle class="circle-bg" cx="18" cy="18" r="16"/>
                    <circle class="circle" cx="18" cy="18" r="16"/>
                </svg>
                <div class="progress-label"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.update();
    }

    attributeChangedCallback() {
        this.update();
    }

    set value(val) {
        this.setAttribute('value', val);
    }
    get value() {
        return this.getAttribute('value');
    }

    set max(val) {
        this.setAttribute('max', val);
    }
    get max() {
        return this.getAttribute('max');
    }

    set label(val) {
        this.setAttribute('label', val);
    }
    get label() {
        return this.getAttribute('label');
    }

    set color(val) {
        this.setAttribute('color', val);
    }
    get color() {
        return this.getAttribute('color');
    }

    set size(val) {
        this.setAttribute('size', val);
    }
    get size() {
        return this.getAttribute('size');
    }

    update() {
        const circle = this.shadowRoot.querySelector('.circle');
        const labelDiv = this.shadowRoot.querySelector('.progress-label');
        const color = this.getAttribute('color');
        const size = this.getAttribute('size');
        const container = this.shadowRoot.querySelector('.radial-progress-container');
        const chart = this.shadowRoot.querySelector('.circular-chart');

        if (size) {
            container.style.width = size;
            container.style.height = size;
            chart.style.width = size;
            chart.style.height = size;
        }
        chart.style.display = 'block';
        if (color) circle.style.stroke = color;

        const value = Number(this.value) || 0;
        const max = Number(this.max) || 100;
        const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
        const r = 16;
        const c = 2 * Math.PI * r;
        const offset = c * (1 - percent / 100);
        circle.setAttribute('stroke-dasharray', `${c}`);
        circle.setAttribute('stroke-dashoffset', `${offset}`);
        labelDiv.textContent = this.label;
    }

    disconnectedCallback() {}
}

customElements.define('radial-progress', RadialProgress);

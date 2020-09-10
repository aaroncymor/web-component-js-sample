const template = document.createElement('template');
template.innerHTML = `
    <style>
        .tooltip-container {
            display: inline-block;
            position: relative;
            z-index: 2;
        }

        .cancel {
            display: none;
        }

        svg {
            width: 1em;
            cursor: pointer;
        }

        .notify-container {
            position: absolute;
            bottom: 125%;
            z-index: 9;
            width: 300px;
            background: #fff;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size: .8em;
            border-radius: .5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
    </style>

    <div class="tooltip-container">
        <svg viewBox="0 0 120 120" class="alert">
            <defs>
                <path d="M116.25 60C116.25 91.05 91.05 116.25 60 116.25C28.95 116.25 3.75 91.05 3.75 60C3.75 28.95 28.95 3.75 60 3.75C91.05 3.75 116.25 28.95 116.25 60Z" id="c1X91L3MaX"></path>
                <path d="M59.43 67.86L80.7 26.25L39.3 26.25L59.43 67.86Z" id="kfDzsjEKe"></path>
                <path d="M67.5 82.5C67.5 86.98 63.97 90.62 59.62 90.62C55.27 90.62 51.74 86.98 51.74 82.5C51.74 78.02 55.27 74.38 59.62 74.38C63.97 74.38 67.5 78.02 67.5 82.5Z" id="a6IitHxLJT"></path>
            </defs>
            <g>
                <g>
                    <g><use xlink:href="#c1X91L3MaX" opacity="1" fill="#52bcbb" fill-opacity="1"></use></g>
                    <g>
                        <use xlink:href="#kfDzsjEKe" opacity="1" fill="#c7cdda" fill-opacity="1"></use>
                        <g><use xlink:href="#kfDzsjEKe" opacity="1" fill-opacity="0" stroke="#ddc2c2" stroke-width="1" stroke-opacity="1"></use></g>
                    </g>
                    <g><use xlink:href="#a6IitHxLJT" opacity="1" fill="#d0d4de" fill-opacity="1"></use></g>
                </g>
            </g>
        </svg>

        <svg viewBox="0 0 120 120" class="cancel">
            <defs>
                <path d="M116.25 60.9C116.25 91.95 91.05 117.15 60 117.15C28.95 117.15 3.75 91.95 3.75 60.9C3.75 29.86 28.95 4.65 60 4.65C91.05 4.65 116.25 29.86 116.25 60.9Z" id="a1Wevv3Wb1"></path>
                <path d="M70.31 60L88.71 77.5L78.4 87.3L60 69.8L41.6 87.3L31.29 77.5L49.69 60L31.29 42.5L41.6 32.7L60 50.2L78.4 32.7L88.71 42.5L70.31 60Z" id="b3tGiS4b1b"></path>
            </defs>
            <g>
                <g>
                    <g><use xlink:href="#a1Wevv3Wb1" opacity="1" fill="#52bcbb" fill-opacity="1"></use></g>
                    <g><use xlink:href="#b3tGiS4b1b" opacity="1" fill="#d0d4de" fill-opacity="1"></use></g>
                </g>
            </g>
        </svg>

        <div class="notify-container">
            <slot name="message">
        </div>
    </div>
`;


class PopupNotify extends HTMLElement {
    constructor() {
        // three lines part of a web component
        // to make it work.

        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if (expandState == true) {
            tooltip.style.transform = "scale(1)";
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        } else {
            tooltip.style.transform = "scale(0)";
            cancel.style.display = 'none';
            alert.style.display = 'block';            
        }
    }

    connectedCallback() {
        // lifecycle for when your component is loaded.
        // put here if you want to load instantly
        this.shadowRoot.querySelector('.alert').addEventListener('click', ()=>{
            this.tooltip(true);
        });

        this.shadowRoot.querySelector('.cancel').addEventListener('click', ()=>{
            this.tooltip(false);
        });

        if (this.getAttribute('tip_background')) {
            this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
        }

        if (this.getAttribute('tip_color')) {
            this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
        }
    }
}

// one final step to make component work
window.customElements.define('popup-notify', PopupNotify);
const $3dd06c5b72a34746$export$d541bacb2bda4494 = {
    opacity: 'opacity',
    color: 'color',
    margin: 'margin',
    gutters: 'gutters',
    disabled: 'disabled',
    controller: 'controller'
};


const $68c5ef1856c63da6$export$3a0507da8b146ff1 = ()=>{
    let size = 4;
    const isTablet = window.matchMedia("(min-width: 450px)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isTablet) size = 8;
    if (isDesktop) size = 12;
    return size;
};


const $4236c468c4b52191$var$createElement = (tag, className)=>{
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};
const $4236c468c4b52191$export$db04bbde7ce01e09 = ()=>{
    const container = $4236c468c4b52191$var$createElement("span", "grid-overlay-container");
    const overlay = $4236c468c4b52191$var$createElement("span", "grid-overlay");
    const controller = $4236c468c4b52191$var$createElement("button", "grid-controller");
    container.append(overlay);
    for(let i = $68c5ef1856c63da6$export$3a0507da8b146ff1(); i > 0; i--){
        const column = document.createElement("span");
        overlay.appendChild(column);
    }
    return {
        container: container,
        controller: controller
    };
};



class $8f3288fd5d8e8768$export$1c41ff9dbe11e487 extends HTMLElement {
    constructor(){
        super();
        this.opacity = 0.3;
        this.color = 'rgb(165, 165, 255)';
        this.margin = '16px';
        this.gutters = '16px';
        this.columns = $68c5ef1856c63da6$export$3a0507da8b146ff1();
        this.shadow = this.attachShadow({
            mode: 'open'
        });
    }
    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === 'controller') newValue = this.getValidControllerValue(newValue);
        if (oldValue !== newValue) this[prop] = newValue;
    }
    connectedCallback() {
        this.observe(document.body);
    }
    static get observedAttributes() {
        return Object.keys($3dd06c5b72a34746$export$d541bacb2bda4494);
    }
    reset() {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = ``;
    }
    observe(element) {
        const resizeObserver = new ResizeObserver(()=>{
            this.reset();
            this.setContent();
        });
        resizeObserver.observe(element);
    }
    setControllerClick(controller, container) {
        controller.onclick = ()=>{
            if (this.disabled) this.removeAttribute('disabled');
            else this.setAttribute('disabled', 'true');
            container.classList.toggle('hidden');
        };
    }
    updateStyle() {
        let style = this.shadow.querySelector('style');
        if (!style) style = document.createElement('style');
        style.textContent = `
        .grid-controller {
          display: ${this.controller ? 'initial' : 'none'};
          position: fixed;
          top: -.5rem;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          height: 40px;
          width: 80px;
          border-radius: .5rem;
          cursor: pointer;
          pointer-events: all;
          border: 0;
          isolation: isolate;
          box-shadow: inset 0 0 2px 2px ${this.color};
          transition: transform .15s ease-in-out;
        }

        .grid-controller:active {
          transform: translate3d(-50%, -45%, 0);
        }

        .grid-overlay-container {
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          padding-left: ${this.margin};
          padding-right: ${this.margin};
          opacity: ${this.opacity};
          pointer-events: none;
          transform: translateY(0);
          transition: all .15s ease-in-out;
        }

        .grid-overlay {
          width: 100%;
          height: 100%;
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(${this.columns}, 1fr);
          gap: ${this.gutters};
          transition: all .15s ease-in-out;
        }

        .hidden {
          opacity: 0;
        }

        .grid-overlay span {
          background: conic-gradient(from 80deg at 30% 110%, #ffffff, ${this.color});
          box-shadow: inset 0 0 2px #000;
        }`;
        return style;
    }
    setContent() {
        const { container: container , controller: controller  } = $4236c468c4b52191$export$db04bbde7ce01e09();
        this.columns = $68c5ef1856c63da6$export$3a0507da8b146ff1();
        this.setControllerClick(controller, container);
        const style = this.updateStyle();
        this.shadow.append(style, container, controller);
    }
    start() {
        const overlay = document.querySelector('grid-overlay');
        if (!overlay) document.body.appendChild(this);
    }
    setOpacity(arg) {
        this.opacity = arg;
    }
    setColor(arg) {
        this.color = arg;
    }
    setMargin(arg) {
        this.margin = arg;
    }
    setGutters(arg) {
        this.gutters = arg;
    }
    setController(arg) {
        this.controller = arg?.toString() || '';
    }
    getValidControllerValue(arg) {
        if (arg === '') return 'true';
        return JSON.parse(arg);
    }
}


customElements.define('grid-overlay', $8f3288fd5d8e8768$export$1c41ff9dbe11e487);
const $149c1bd638913645$export$29dd17c7f3c81c36 = new $8f3288fd5d8e8768$export$1c41ff9dbe11e487();


export {$149c1bd638913645$export$29dd17c7f3c81c36 as overlay};
//# sourceMappingURL=module.js.map

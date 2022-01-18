import { property } from "./const";
import { defineElements } from "./defineElements";
import { getGridSize } from "./getGridSize";

export class GridOverlay extends HTMLElement {
  columns: number;
  opacity: number;
  color: string;
  margin: string;
  gutters: string;
  disabled: boolean;

  private shadow: ShadowRoot;

  constructor() {
    super();
    this.columns = 4;
    this.opacity = 0.3;
    this.color = "rgb(165, 165, 255)";
    this.margin = "16px";
    this.gutters = "16px";
    this.disabled = false;
    this.shadow = this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (oldValue !== newValue) this[prop] = newValue;
    if (prop === property.disabled) this.disable();
  }

  connectedCallback() {
    this.observe(document.body);
  }

  static get observedAttributes() {
    return Object.keys(property);
  }

  observe(element: Element) {
    const resizeObserver = new ResizeObserver(() => {
      this.setContent();
    });
    resizeObserver.observe(element);
  }

  updateStyle() {
    let style = this.shadow.querySelector("style");
    if (!style) {
      style = document.createElement("style");
    }
    style.textContent = `
        .grid-overlay-container {
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          padding-left: ${this.margin};
          padding-right: ${this.margin};
          transition: all .15s ease-in-out;
          opacity: ${this.opacity};
          pointer-events: none;
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

        .grid-overlay span {
          background: conic-gradient(from 80deg at 30% 110%, #ffffff, ${this.color});
        }`;

    return style;
  }

  setContent() {
    const { container } = defineElements();
    const columns = getGridSize();
    this.columns = columns;
    const style = this.updateStyle();
    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
  }

  public enable() {
    const overlay = document.querySelector("grid-overlay");
    if (!overlay) document.body.appendChild(this);
  }

  public disable() {
    this.disabled = true;
    this.opacity = 0;
  }
}

import { property } from "./const";
import { defineColumns } from "./defineColumns";
import { getGridSize } from "./getGridSize";

export class GridOverlay extends HTMLElement {
  columns: number;
  opacity: number;
  color: string;
  margin: string;
  gutters: string;
  disabled: boolean;
  container: HTMLElement;
  shadow: ShadowRoot;

  constructor() {
    super();
    this.columns = 4;
    this.opacity = 0.3;
    this.color = "rgb(165, 165, 255)";
    this.margin = "16px";
    this.gutters = "16px";
    this.disabled = false;
    this.container = document.createElement("div");
    this.shadow = this.attachShadow({ mode: "open" });
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

  setColumns() {
    const gridSize = getGridSize();
    this.columns = gridSize;
  }

  setContent() {
    const { container } = defineColumns();
    this.setColumns();

    this.shadow.innerHTML = `
      <style>
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
          background: ${this.color};
        }
      </style>
      `;

    this.shadow.appendChild(container);
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue !== newValue) this[property] = newValue;
  }

  connectedCallback() {
    this.observe(document.body);
  }
}

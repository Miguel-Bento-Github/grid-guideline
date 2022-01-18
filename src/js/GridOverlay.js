import { property } from "./const.js";
import { defineColumns } from "./defineColumns.js";

export class GridOverlay extends HTMLElement {
  constructor() {
    super();
    this.opacity = 0.3;
    this.color = "rgb(165, 165, 255)";
    this.margin = "16px";
    this.gutters = "16px";
    this.disabled = false;
  }

  static get observedAttributes() {
    return Object.keys(property);
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue !== newValue) this[property] = newValue;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    const { container, gridSize } = defineColumns();
    shadow.innerHTML = `
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
          grid-template-columns: repeat(${gridSize}, 1fr);
          gap: ${this.gutters};
          transition: all .15s ease-in-out;
        }

        .grid-overlay span {
          background: ${this.color};
        }
      </style>
      `;

    shadow.appendChild(container);
  }
}

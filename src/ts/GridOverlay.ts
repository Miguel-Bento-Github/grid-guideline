import { property } from "./const";
import { defineElements } from "./defineElements";
import { getGridSize } from "./getGridSize";

export class GridOverlay extends HTMLElement {
  opacity: number;
  color: string;
  margin: string;
  gutters: string;
  disabled?: string | boolean;
  controller?: string | boolean;

  private shadow: ShadowRoot;
  private columns: number;

  constructor() {
    super();
    this.opacity = 0.3;
    this.color = "rgb(165, 165, 255)";
    this.margin = "16px";
    this.gutters = "16px";

    this.columns = getGridSize();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback<T extends keyof typeof property>(
    prop: T,
    oldValue: this[T],
    newValue: this[T]
  ) {
    if (prop === "controller") {
      newValue = this.getValidControllerValue(newValue as string);
    }
    if (oldValue !== newValue) this[prop] = newValue;
  }

  connectedCallback() {
    this.observe(document.body);
  }

  static get observedAttributes() {
    return Object.keys(property);
  }

  reset() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = ``;
  }

  observe(element: Element) {
    const resizeObserver = new ResizeObserver(() => {
      this.reset();
      this.setContent();
    });
    resizeObserver.observe(element);
  }

  private setControllerClick<E extends HTMLElement>(
    controller: E,
    container: E
  ) {
    controller.onclick = () => {
      if (this.disabled) {
        this.removeAttribute("disabled");
      } else {
        this.setAttribute("disabled", "true");
      }
      container.classList.toggle("hidden");
    };
  }

  updateStyle() {
    let style = this.shadow.querySelector("style");
    if (!style) {
      style = document.createElement("style");
    }
    style.textContent = `
        .grid-controller {
          display: ${this.controller ? "initial" : "none"};
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
          background: conic-gradient(from 80deg at 30% 110%, #ffffff, ${
            this.color
          });
          box-shadow: inset 0 0 2px #000;
        }`;

    return style;
  }

  setContent() {
    const { container, controller } = defineElements();
    this.columns = getGridSize();
    this.setControllerClick(controller, container);
    const style = this.updateStyle();
    this.shadow.append(style, container, controller);
  }

  public start() {
    const overlay = document.querySelector("grid-overlay");
    if (!overlay) document.body.appendChild(this);
  }

  public setOpacity(arg: number) {
    this.opacity = arg;
  }

  public setColor(arg: string) {
    this.color = arg;
  }

  public setMargin(arg: string) {
    this.margin = arg;
  }

  public setGutters(arg: string) {
    this.gutters = arg;
  }

  public setDisabled(arg?: string) {
    this.disabled = arg?.toString() || "";
  }

  public setController(arg?: string | boolean) {
    this.controller = arg?.toString() || "";
  }

  getValidControllerValue(arg: string) {
    if (arg === "") return "true";
    return JSON.parse(arg);
  }
}

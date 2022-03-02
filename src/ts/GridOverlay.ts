import { Property, property } from './const'
import { defineElements } from './defineElements'
import { getGridSize } from './getGridSize'

export class GridOverlay extends HTMLElement {
  private option: Property
  private shadow: ShadowRoot
  private columns: number

  constructor() {
    super()
    this.option = Object.seal({
      opacity: 0.3,
      color: 'rgb(165, 165, 255)',
      margin: '16px',
      gutters: '16px',
      width: '1200px',
    })

    this.columns = getGridSize()
    this.shadow = Object.seal(this.attachShadow({ mode: 'open' }))
  }

  static get observedAttributes() {
    return Object.keys(property)
  }

  private attributeChangedCallback<P extends keyof typeof property>(
    prop: P,
    oldValue: Property[P],
    newValue: Property[P]
  ) {
    const isDifferent = oldValue !== newValue

    if (prop === 'controller' && isDifferent && typeof newValue === 'string') {
      newValue = this.getValidControllerValue(newValue)
    }

    if (isDifferent) this.option[prop] = newValue
  }

  private connectedCallback() {
    this.observe(document.body)
  }

  private reset() {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = ``
  }

  private observe(element: Element) {
    const resizeObserver = new ResizeObserver(() => {
      this.reset()
      this.setContent()
    })
    resizeObserver.observe(element)
  }

  private setControllerClick<E extends HTMLElement>(
    controller: E,
    container: E
  ) {
    controller.onclick = () => {
      if (this.option.disabled) {
        this.removeAttribute('disabled')
      } else {
        this.setAttribute('disabled', 'true')
      }
      container.classList.toggle('hidden')
    }
  }

  private updateStyle() {
    let style = this.shadow.querySelector('style')
    if (!style) {
      style = document.createElement('style')
    }
    style.textContent = `
        .grid-controller {
          display: ${this.option.controller ? 'initial' : 'none'};
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
          box-shadow: inset 0 0 2px 2px ${this.option.color};
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
          padding-left: ${this.option.margin};
          padding-right: ${this.option.margin};
          opacity: ${this.option.opacity};
          pointer-events: none;
          transform: translateY(0);
          transition: all .15s ease-in-out;
        }

        .grid-overlay {
          width: 100%;
          height: 100%;
          max-width: ${this.option.width};
          margin: auto;
          display: grid;
          grid-template-columns: repeat(${this.columns}, 1fr);
          gap: ${this.option.gutters};
          transition: all .15s ease-in-out;
        }

        .hidden {
          opacity: 0;
        }

        .grid-overlay span {
          background: conic-gradient(from 80deg at 30% 110%, #ffffff, ${
            this.option.color
          });
          box-shadow: inset 0 0 2px #000;
        }`

    return style
  }

  private setContent() {
    const { container, controller } = defineElements()
    this.columns = getGridSize()
    this.setControllerClick(controller, container)
    const style = this.updateStyle()
    this.shadow.append(style, container, controller)
  }

  public start() {
    const overlay = document.querySelector('grid-overlay')
    if (!overlay) document.body.appendChild(this)
  }

  public setOpacity(arg: number) {
    this.option.opacity = arg
  }

  public setColor(arg: string) {
    this.option.color = arg
  }

  public setWidth(arg: string) {
    this.option.width = arg
  }

  public setMargin(arg: string) {
    this.option.margin = arg
  }

  public setGutters(arg: string) {
    this.option.gutters = arg
  }

  public setController(arg: boolean) {
    this.option.controller = arg
  }

  /**
   * Allow the usage of the controller option on a template without `arg`
   * eg:
   * ```html
   * <grid-overlay controller></grid-overlay>
   * ```
   */
  private getValidControllerValue(arg: string) {
    if (arg === '') return true
    return JSON.parse(arg)
  }
}

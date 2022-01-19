declare const property: {
    readonly opacity: "opacity";
    readonly color: "color";
    readonly margin: "margin";
    readonly gutters: "gutters";
    readonly disabled: "disabled";
    readonly controller: "controller";
};
declare class GridOverlay extends HTMLElement {
    opacity: number;
    color: string;
    margin: string;
    gutters: string;
    disabled?: string | boolean;
    controller?: string | boolean;
    constructor();
    attributeChangedCallback<T extends keyof typeof property>(prop: T, oldValue: this[T], newValue: this[T]): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    reset(): void;
    observe(element: Element): void;
    updateStyle(): HTMLStyleElement;
    setContent(): void;
    start(): void;
    setOpacity(arg: number): void;
    setColor(arg: string): void;
    setMargin(arg: string): void;
    setGutters(arg: string): void;
    setDisabled(arg?: string): void;
    setController(arg?: string | boolean): void;
    getValidControllerValue(arg: string): any;
}
export const overlay: GridOverlay;
export type Overlay = typeof overlay;

//# sourceMappingURL=types.d.ts.map

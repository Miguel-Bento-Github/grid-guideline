declare const property: {
    opacity: string;
    margin: string;
    gutters: string;
    disabled: string;
    color: string;
};
declare class GridOverlay extends HTMLElement {
    columns: number;
    opacity: number;
    color: string;
    margin: string;
    gutters: string;
    disabled: boolean;
    constructor();
    attributeChangedCallback<T extends keyof typeof property>(prop: T, oldValue: this[T], newValue: this[T]): void;
    connectedCallback(): void;
    static get observedAttributes(): string[];
    observe(element: Element): void;
    updateStyle(): HTMLStyleElement;
    setContent(): void;
    enable(): void;
    disable(): void;
    setColumns(arg: number): void;
    setOpacity(arg: number): void;
    setColor(arg: string): void;
    setMargin(arg: string): void;
    setGutters(arg: string): void;
}
export const overlay: GridOverlay;
export type Overlay = typeof overlay;

//# sourceMappingURL=types.d.ts.map

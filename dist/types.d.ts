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
    attributeChangedCallback<P extends keyof typeof property>(prop: P, oldValue: this[P], newValue: this[P]): void;
    static get observedAttributes(): string[];
    start(): void;
    setOpacity(arg: number): void;
    setColor(arg: string): void;
    setMargin(arg: string): void;
    setGutters(arg: string): void;
    setController(arg?: string | boolean): void;
}
export const overlay: GridOverlay;

//# sourceMappingURL=types.d.ts.map

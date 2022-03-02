declare class GridOverlay extends HTMLElement {
    constructor();
    static get observedAttributes(): string[];
    start(): void;
    setOpacity(arg: number): void;
    setColor(arg: string): void;
    setWidth(arg: string): void;
    setMargin(arg: string): void;
    setGutters(arg: string): void;
    setController(arg: boolean): void;
}
export const overlay: GridOverlay;

//# sourceMappingURL=types.d.ts.map

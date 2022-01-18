import { GridOverlay } from "./ts/GridOverlay";

customElements.define("grid-overlay", GridOverlay);

export const overlay = new GridOverlay();
export type Overlay = typeof overlay;

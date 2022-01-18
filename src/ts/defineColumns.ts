import { getGridSize } from "./getGridSize";

const createElement = (tag: string, className: string) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

export const defineColumns = () => {
  const gridSize = getGridSize();
  const container = createElement("span", "grid-overlay-container");
  const overlay = createElement("span", "grid-overlay");
  container.appendChild(overlay);

  for (let i = gridSize; i > 0; i--) {
    const column = document.createElement("span");
    overlay.appendChild(column);
  }
  return { container };
};

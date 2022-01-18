import { getGridSize } from "./getGridSize.js";

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

export const defineColumns = () => {
  const gridSize = getGridSize();
  const container = createElement("span", "grid-overlay-container");
  const grid = createElement("span", "grid-overlay");
  container.appendChild(grid);

  for (let i = gridSize; i > 0; i--) {
    const column = document.createElement("span");
    grid.appendChild(column);
  }
  return { container, gridSize };
};

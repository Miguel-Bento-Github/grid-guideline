import { getGridSize } from "./getGridSize";

const createElement = (tag: string, className: string) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

export const defineElements = () => {
  const container = createElement("span", "grid-overlay-container");
  const overlay = createElement("span", "grid-overlay");
  const controller = createElement("button", "grid-controller");

  container.append(overlay);

  for (let i = getGridSize(); i > 0; i--) {
    const column = document.createElement("span");
    overlay.appendChild(column);
  }
  return { container, controller };
};

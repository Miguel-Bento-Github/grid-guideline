export const getGridSize = () => {
  let size = 4;
  const isTablet = window.matchMedia("(min-width: 450px)").matches;
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (isTablet) size = 8;
  if (isDesktop) size = 12;

  return size;
};

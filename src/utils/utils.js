export const getSimilarColor = (params: {
  r: number,
  g: number,
  b: number,
}) => {
  const RANGE = 25;
  const { r, g, b } = params;
  const newColors = [
    r + getRandomInt(-RANGE, RANGE),
    g + getRandomInt(-RANGE, RANGE),
    b + getRandomInt(-RANGE, RANGE),
  ];
  newColors.forEach(color => (color > 255 ? 255 : color < 0 ? 0 : color)); //eslint-disable-line
  return `rgba(${newColors[0]}, ${newColors[1]}, ${newColors[2]})`;
};

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export type Color = {
  r: number,
  g: number,
  b: number,
};

export const POSITIONS = {
  RIGHT: 'right',
  LEFT: 'left',
};

export type Position = $Keys<typeof positions>; //eslint-disable-line

export const pointerStyle = { cursor: 'pointer' };

export const colorToString = (color: Color) =>
  `rgb(${color.r}, ${color.g}, ${color.b})`;

export const multiplyColors: Color = (c1: Color, c2: Color) => ({
  r: (c1.r + c2.r) / 2,
  g: (c1.g + c2.g) / 2,
  b: (c1.b + c2.b) / 2,
});

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16), // eslint-disable-line
        g: parseInt(result[2], 16), // eslint-disable-line
        b: parseInt(result[3], 16), // eslint-disable-line
      } // eslint-disable-line
    : null;
};

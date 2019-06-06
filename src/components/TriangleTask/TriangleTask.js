// @flow
import * as React from 'react';

import Rects from './TriangleTask/Rects';
import type { Color } from '../../utils/utils';
import Task from '../Task/Task';

type State = {
  rows: Array<{
    id: number,
    rects: Array<{ id: number, color: string }>,
  }>,
  colorPicker: {
    top: boolean,
    left: boolean,
    right: boolean,
  },
  colors: {
    top: Color,
    left: Color,
    right: Color,
  },
};

class TriangleTask extends React.Component<{}, State> {
  state: State;

  constructor() {
    super();

    const initialColors = {
      top: { r: 255, g: 0, b: 0 },
      right: { r: 255, g: 255, b: 255 },
      left: { r: 0, g: 0, b: 0 },
    };

    this.state = {
      rows: this.makeRects(initialColors),
      colorPicker: {
        top: false,
        left: false,
        right: false,
      },
      colors: initialColors,
    };
  }

  changePickerVisibility = (picker: string, visible: boolean) => {
    this.setState((prevState: State) => {
      const colorPicker = { ...prevState.colorPicker };
      colorPicker[picker] = visible;
      return { colorPicker };
    });
  };

  changeColor = (picker: string, color: Color) => {
    console.log({ picker, color });
    this.setState((prevState: State) => {
      const colors = { ...prevState.colors };
      colors[picker] = {
        r: color.r,
        g: color.g,
        b: color.b,
      };
      return { colors, rows: this.makeRects(colors) };
    });
  };

  makeRects = (colors: { top: Color, right: Color, left: Color }) => {
    const { top, right, left } = colors;
    const rows = [];
    const dx = divideColor(substractColor(left, top), 4);
    const dy = divideColor(substractColor(right, top), 4);

    for (let i = 0; i < 5; i += 1) {
      const rects = [];
      for (let j = 0; j < i + 1; j += 1) {
        const delta = addColor(multiplyColor(dx, i - j), multiplyColor(dy, j));
        const color = addColor(top, delta);
        rects.push({
          id: j,
          color: `rgba(${color.r}, ${color.g}, ${color.b})`,
        });
      }
      rows.push({
        id: i,
        rects,
      });
    }
    return rows;
  };

  render() {
    const { rows, colorPicker, colors } = this.state;
    return (
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <Task>Нажмите на вершины, чтобы поменять цвета</Task>
        <Rects
          rows={rows}
          colorPicker={colorPicker}
          changePickerVisibility={this.changePickerVisibility}
          changeColor={this.changeColor}
          colors={colors}
        />
      </div>
    );
  }
}

const substractColor = (c1: Color, c2: Color) => ({
  r: c1.r - c2.r,
  g: c1.g - c2.g,
  b: c1.b - c2.b,
});

const divideColor = (color: Color, n: number) => ({
  r: color.r / n,
  g: color.g / n,
  b: color.b / n,
});

const addColor = (c1: Color, c2: Color) => ({
  r: c1.r + c2.r,
  g: c1.g + c2.g,
  b: c1.b + c2.b,
});

const multiplyColor = (color: Color, n: number) => ({
  r: color.r * n,
  g: color.g * n,
  b: color.b * n,
});

export default TriangleTask;

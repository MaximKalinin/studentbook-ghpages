// @flow
import * as React from 'react';
import styled from 'styled-components';

import Task from '../Task/Task';
import { multiplyColors, hexToRgb, colorToString } from '../../utils/utils';

const PALETTES = [
  {
    name: 'ancient',
    text: 'Древняя',
    colors: ['#6D98C0', '#F8E16D', '#A76143', '#819178'],
  },
  {
    name: 'pop-art',
    text: 'Поп-арт',
    colors: ['#76BBED', '#4F5981', '#D0579C', '#DD7D4C'],
  },
  {
    name: 'fruit',
    text: 'Фруктовая',
    colors: ['#624355', '#52AC62', '#F9EC97', '#D96C74'],
  },
  {
    name: 'warm',
    text: 'Теплая',
    colors: ['#753600', '#74CB00', '#FF7202', '#FCCFD2'],
  },
  {
    name: 'cold',
    text: 'Холодная',
    colors: ['#505B4B', '#7FD9DA', '#E67275', '#9A9A9A'],
  },
];

const GRADIENT_HEIGHT = 120;
const GRADIENT_WIDTH = 40;
const ANIM_DURATION = 500;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* grid-template-columns: 1fr 1fr; */
  /* column-gap: 10px; */
`;

// $FlowFixMe
const Gradient = styled.div`
  height: ${GRADIENT_HEIGHT}px;
  width: ${GRADIENT_WIDTH}%;
  background: ${({ color }) =>
    (color &&
      `linear-gradient(to right, #ffffff 0%, ${colorToString(
        multiplyColors({ r: 255, g: 255, b: 255 }, hexToRgb(color)),
      )} 75%, ${color} 100%)`) ||
    'white'};
  margin: 20px;
  border: 1px solid grey;
  /* transition: background-color 1s ease-out; */
  /* animation: ${({ animate }) =>
    (animate && `fadeInGradient ${ANIM_DURATION}ms infinite ease-in-out`) ||
    ''}; */
  &.animate {
    animation: fadeInGradient 500ms;
  }
  @keyframes fadeInGradient {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Select = styled.label`
  display: block;
  & > select {
    display: block;
    margin: auto;
  }
`;

type State = {
  paletteIndex: number,
  prevPaletteIndex: number,
  animate: boolean,
  taskStyles: {
    paddingBottom: string,
  },
};

class GradientTask extends React.Component<{}, State> {
  wrapperRef: *;

  state: State;

  constructor() {
    super();

    this.wrapperRef = React.createRef();

    this.state = {
      paletteIndex: 0,
      prevPaletteIndex: 0,
      animate: false,
      taskStyles: {
        paddingBottom: '0px',
      },
    };
  }

  componentDidMount() {
    const wrapper = this.wrapperRef.current;
    if (wrapper) {
      const taskStyles = {
        paddingBottom: `${wrapper.clientHeight}px`,
      };
      this.setState({ taskStyles });
    }
  }

  selectPalette = (event: *) => {
    const { paletteIndex } = this.state;
    if (paletteIndex !== event.target.value) {
      this.setState({
        paletteIndex: event.target.value,
        animate: true,
        prevPaletteIndex: paletteIndex,
      });
      setTimeout(() => this.setState({ animate: false }), ANIM_DURATION);
    }
  };

  render() {
    const { paletteIndex, prevPaletteIndex, animate, taskStyles } = this.state;
    return (
      <div style={taskStyles}>
        <Task>Выберите палитру</Task>
        <Select>
          <select
            value={paletteIndex}
            name="palettes"
            onChange={this.selectPalette}
          >
            {PALETTES.map((palette, index) => (
              <option value={index} key={`palette${palette.name}`}>
                {palette.text}
              </option>
            ))}
          </select>
        </Select>
        <div style={{ position: 'relative' }}>
          <Wrapper ref={this.wrapperRef}>
            {PALETTES[prevPaletteIndex].colors.map(color => (
              <Gradient color={color} />
            ))}
          </Wrapper>
          <Wrapper>
            {PALETTES[paletteIndex].colors.map(color => (
              <Gradient
                color={color}
                className={(animate && 'animate') || ''}
              />
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default GradientTask;

// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Color } from '../../utils/utils';
import {
  colorToString,
  pointerStyle,
  multiplyColors,
  POSITIONS,
} from '../../utils/utils';
import ColorPicker from '../ColorPicker/ColorPicker';
import Task from '../Task/Task';

// $FlowFixMe
const RectEl = styled.div`
  background-color: ${({ color }) => color || 'red'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a31313;
  font-family: Times serif;
  font-size: 30px;
  font-weight: 700;
  width: 100px;
  height: 100px;
  transition: background-color 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 50px;
  padding: 0 10px;
`;

const RectWrapper = styled.div`
  position: relative;
`;

type State = {
  colors: {
    first: Color,
    second: Color,
  },
  colorPicker: {
    first: boolean,
    second: boolean,
  },
};

class MultiplyColorTask extends React.Component<{}, State> {
  state: State;

  state = {
    colors: {
      first: {
        r: 242,
        g: 203,
        b: 68,
      },
      second: {
        r: 44,
        g: 117,
        b: 184,
      },
    },
    colorPicker: {
      first: false,
      second: false,
    },
  };

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
      return { colors };
    });
  };

  render() {
    const { colors, colorPicker } = this.state;
    return (
      <div>
        <Task>Выберите два цвета, чтобы получить их смешение</Task>
        <Wrapper>
          <RectWrapper>
            {colorPicker.first && (
              <ColorPicker
                close={() => this.changePickerVisibility('first', false)}
                onChangeComplete={color => this.changeColor('first', color.rgb)}
                color={colors.first}
              />
            )}
            <RectEl
              color={colorToString(colors.first)}
              style={pointerStyle}
              onClick={() => this.changePickerVisibility('first', true)}
            />
          </RectWrapper>
          <Text>+</Text>
          <RectWrapper>
            {colorPicker.second && (
              <ColorPicker
                close={() => this.changePickerVisibility('second', false)}
                onChangeComplete={color =>
                  this.changeColor('second', color.rgb)
                }
                color={colors.second}
                position={POSITIONS.LEFT}
              />
            )}
            <RectEl
              color={colorToString(colors.second)}
              style={pointerStyle}
              onClick={() => this.changePickerVisibility('second', true)}
            />
          </RectWrapper>
          <Text>=</Text>
          <div style={{ position: 'relative' }}>
            <RectEl
              color={colorToString(multiplyColors(colors.first, colors.second))}
            />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default MultiplyColorTask;

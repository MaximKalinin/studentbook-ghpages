// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Color } from '../../../utils/utils';
import ColorPicker from '../../ColorPicker/ColorPicker';

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

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const RectsEl = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  margin: auto;
`;

type Props = {
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
  changePickerVisibility: (picker: string, visible: boolean) => void,
  changeColor: (picker: string, color: Color) => void,
};

const Rects = (props: Props) => {
  const {
    rows,
    colorPicker,
    changePickerVisibility,
    changeColor,
    colors,
  } = props;
  return (
    <RectsEl>
      {rows.map((row, rowIndex) => (
        <Row key={row.id}>
          {row.rects.map((rect, rectIndex) => {
            let picker = '';
            let openPicker = () => null;
            let pickerEl = null;
            let pointerStyle = {};
            if (rowIndex === 0 && rectIndex === 0) {
              picker = 'top';
              pointerStyle = { cursor: 'pointer' };
              openPicker = () => changePickerVisibility(picker, true);
              pickerEl = (
                <ColorPicker
                  close={() => changePickerVisibility(picker, false)}
                  onChangeComplete={color => changeColor(picker, color.rgb)}
                  color={colors[picker]}
                />
              );
            }
            if (rowIndex === 4 && rectIndex === 0) {
              picker = 'left';
              pointerStyle = { cursor: 'pointer' };
              openPicker = () => changePickerVisibility(picker, true);
              pickerEl = (
                <ColorPicker
                  close={() => changePickerVisibility(picker, false)}
                  onChangeComplete={color => changeColor(picker, color.rgb)}
                  color={colors[picker]}
                />
              );
            }
            if (rowIndex === 4 && rectIndex === 4) {
              picker = 'right';
              pointerStyle = { cursor: 'pointer' };
              openPicker = () => changePickerVisibility(picker, true);
              pickerEl = (
                <ColorPicker
                  close={() => changePickerVisibility(picker, false)}
                  onChangeComplete={color => changeColor(picker, color.rgb)}
                  color={colors[picker]}
                />
              );
            }
            return (
              <div
                style={{ position: 'relative' }}
                key={`${row.id} ${rect.id}`}
              >
                <RectEl
                  color={rect.color}
                  onClick={openPicker}
                  style={pointerStyle}
                />
                {picker !== '' && colorPicker[picker] && pickerEl}
              </div>
            );
          })}
        </Row>
      ))}
    </RectsEl>
  );
};

export default Rects;

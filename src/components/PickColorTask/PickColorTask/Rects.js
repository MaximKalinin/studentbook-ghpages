// @flow
import * as React from 'react';
import styled from 'styled-components';

import Answer from '../../Answer/Answer';

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
  cursor: pointer;
`;

const RectsEl = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-gap: 10px;
  margin: auto;
  justify-content: center;
`;

type Props = {
  rects: Array<{
    id: number,
    showAnswer?: boolean,
    answer?: boolean,
    text?: string,
  }>,
  onColorClick: (index: number) => void,
};

const Rects = (props: Props) => {
  const { rects, onColorClick } = props;
  return (
    <RectsEl>
      {rects.map((prop, index) => {
        const answerEl = <Answer correct={prop.answer} />;
        return (
          <RectEl
            {...prop}
            key={prop.id}
            onClick={
              prop.answer !== undefined ? () => onColorClick(index) : () => null
            }
          >
            {prop.showAnswer && answerEl}
            {prop.text ? prop.text : ''}
          </RectEl>
        );
      })}
    </RectsEl>
  );
};

export default Rects;

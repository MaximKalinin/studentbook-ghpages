// @flow
import * as React from 'react';

import Rects from './PickColorTask/Rects';
import Button from '../Button/Button';
import Task from '../Task/Task';

import { getSimilarColor, getRandomInt } from '../../utils/utils';

// const rects = [];

// makeRects();

type State = {
  rects: Array<{
    showAnswer?: boolean,
    answer?: boolean,
    id: number,
    text?: string,
  }>,
  restart: boolean,
};

class PickColorTask extends React.Component<{}, State> {
  state: State = {
    rects: [],
    restart: false,
  };

  constructor() {
    super();

    this.state = { rects: this.makeRects(), restart: false };
  }

  onColorClick = (index: number) => {
    console.log('show answer');
    const { rects } = this.state;

    const newRects = [...rects];

    newRects[index].showAnswer = true;
    this.setState({ rects: newRects, restart: true });
  };

  onRestartClick = () => {
    this.setState({ rects: this.makeRects(), restart: false });
  };

  makeRects = () => {
    const rects = [];
    let sameRect = 5;
    while (sameRect === 5) {
      sameRect = getRandomInt(0, 12);
    }
    for (let i = 0; i < 13; i += 1) {
      if (i === 5) {
        rects.push({
          style: {
            gridColumnStart: 2,
            gridColumnEnd: 4,
            gridRowStart: 2,
            gridRowEnd: 4,
          },
          color: 'rgb(255, 218, 88)',
          id: i,
          text: 'Образец',
        });
      } else if (sameRect === i) {
        rects.push({
          color: 'rgb(255, 218, 88)',
          id: i,
          answer: true,
          showAnswer: false,
        });
      } else {
        rects.push({
          color: getSimilarColor({ r: 255, g: 218, b: 88 }),
          id: i,
          answer: false,
          showAnswer: false,
        });
      }
    }
    return rects;
  };

  render() {
    const { rects, restart } = this.state;
    return (
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <Task>Нажмите на квадратик, соответствующий образцовому</Task>
        <Rects rects={rects} onColorClick={this.onColorClick} />
        {restart && (
          <Button
            type="button"
            onClick={this.onRestartClick}
            style={{
              position: 'absolute',
              top: '48%',
              right: '50%',
              transform: 'translate(50%)',
            }}
          >
            Сыграть заново
          </Button>
        )}
      </div>
    );
  }
}

export default PickColorTask;

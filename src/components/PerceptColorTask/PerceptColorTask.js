// @flow
import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Button from '../Button/Button';
import Answer from '../Answer/Answer';
import Task from '../Task/Task';

const COLORS = [
  {
    name: 'Красный',
    color: 'red',
  },
  {
    name: 'Оранжевый',
    color: 'orange',
  },
  {
    name: 'Желтый',
    color: 'yellow',
  },
  {
    name: 'Зеленый',
    color: 'springgreen',
  },
  {
    name: 'Голубой',
    color: 'lightskyblue',
  },
  {
    name: 'Синий',
    color: 'blue',
  },
  {
    name: 'Фиолетовый',
    color: 'violet',
  },
];

const TASK_TIME = 2000;

const OPTIONS = 5;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

// $FlowFixMe
const TaskEl = styled.span`
  font-size: 50px;
  color: white;
  padding: 20px;
  display: block;
  background: ${({ color }) => color || 'white'};
  border-radius: 20px;
  margin: 20px;
`;

const StartButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

// $FlowFixMe
const TaskWrapper = styled.div`
  opacity: ${({ opacity }) => opacity};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 10px;
  background: grey;
  position: absolute;
  margin: auto;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: green;
    animation: progressBar ${TASK_TIME}ms infinite;
  }
  @keyframes progressBar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

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

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(${OPTIONS}, 100px);
  grid-template-rows: 100px;
  grid-gap: 10px;
`;

type State = {
  gameStart: boolean,
  gameFinish: boolean,
  colorIndex: number,
  optionIndexes: Array<number>,
  gameId: number,
  color: number,
};

class PerceptColorTask extends React.Component<{}, State> {
  state: State = {
    gameStart: false,
    gameFinish: false,
    colorIndex: 0,
    optionIndexes: [],
    gameId: 0,
    color: 0,
  };

  startGame = () => {
    const newGameId = _.now();
    const colorIndex = Math.trunc(Math.random() * COLORS.length);
    const color = Math.trunc(Math.random() * COLORS.length);
    const optionIndexes = [];
    optionIndexes.push(colorIndex);
    for (let i = 1; i < OPTIONS; i += 1) {
      let otherIndex = Math.trunc(Math.random() * COLORS.length);
      while (otherIndex === colorIndex || optionIndexes.includes(otherIndex)) {
        otherIndex = Math.trunc(Math.random() * COLORS.length);
        console.log({ otherIndex, optionIndexes: [...optionIndexes] });
      }
      optionIndexes.push(otherIndex);
    }
    optionIndexes.sort((a, b) => (a > b && 1) || (a < b && -1) || 0);
    console.log({ colorIndex, optionIndexes });
    this.setState({
      gameStart: true,
      optionIndexes,
      colorIndex,
      gameId: newGameId,
      color,
    });
    setTimeout(() => {
      const { gameStart, gameId } = this.state;
      if (gameStart && gameId === newGameId) {
        this.setState({ gameFinish: true });
      }
    }, TASK_TIME);
  };

  restart = () => {
    this.setState({ gameStart: false, gameFinish: false });
    this.startGame();
  };

  clickColor = () => {
    this.setState({ gameFinish: true });
  };

  render() {
    const {
      gameStart,
      optionIndexes,
      colorIndex,
      gameFinish,
      color,
    } = this.state;
    return (
      <Wrapper>
        <Task>Правильно выберите цвет</Task>
        {!gameStart && (
          <StartButton>
            <Button onClick={this.startGame}>Начать</Button>
          </StartButton>
        )}
        {gameFinish && (
          <StartButton>
            <Button onClick={this.restart}>Еще раз</Button>
          </StartButton>
        )}
        <TaskWrapper opacity={(gameStart && 1) || 0}>
          {gameStart && !gameFinish && <ProgressBar />}
          <TaskEl color={COLORS[color].color}>{COLORS[colorIndex].name}</TaskEl>
          <Options>
            {optionIndexes.map(index => {
              const correct = index === colorIndex;
              const answerEl = <Answer correct={correct} />;
              return (
                <RectEl
                  key={`perceptOption${index}`}
                  color={COLORS[index].color}
                  onClick={this.clickColor}
                >
                  {gameFinish && answerEl}
                </RectEl>
              );
            })}
          </Options>
        </TaskWrapper>
      </Wrapper>
    );
  }
}

export default PerceptColorTask;

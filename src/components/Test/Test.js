import * as React from 'react';
import styled from 'styled-components';
import Task from '../Task/Task';
import Button from '../Button/Button';

const tasks = [
  {
    text:
      'Качество цвета, определяемое длиной световой волны (в нм) и приравниваемое к одному из спектральных или неспектральных (пурпурных) цветов. К какому понятию относится данное определение?',
    options: ['Цветовой тон', 'Насыщенность', 'Чистота'],
    answer: 0,
  },
  {
    text: 'Какого цвета нет в стандартном цветовом круге?',
    options: ['Сине-фиолетовый', 'Розовый', 'Пурпурный'],
    answer: 1,
  },
  {
    text: 'В какой из областей наук имеет отношение цветоведение?',
    options: ['Физиология', 'Математика', 'Этика'],
    answer: 1,
  },
  {
    text: 'Хроматический контраст – это',
    options: [
      'кажущееся изменение степени светлоты предмета (или плоской фигуры, пятна) в зависимости от степени светлоты фона в сторону посветления или потемнения.',
      'кажущееся изменение оттенка цвета предмета (тела) или плоской фигуры (пятна) под воздействием цвета фона (или соседнего цвета), на котором (рядом с которым) он воспринимается в зависимости от этого цвета.',
    ],
    answer: 1,
  },
  {
    text: '«Теплохолодная» контрастность – это',
    options: ['Сине-красная', 'Сине-зеленая', 'Сине-желтая'],
    answer: 2,
  },
  {
    text: 'Сколько цветовых контрастов выделял И. Иттон?',
    options: ['3', '5', '7'],
    answer: 2,
  },
  {
    text: 'Синий + зеленый =',
    options: ['Фиолетовый', 'Голубой', 'Черный'],
    answer: 1,
  },
  {
    text:
      'Гармоничные размеры плоскостей для основных и дополнительных цветов могут быть выражены одним из следующих цифровых соотношений:',
    options: [
      'жёлтый: оранжевый =3:4',
      'жёлтый: красный =3:8',
      'жёлтый: фиолетовый =2:9',
    ],
    answer: 0,
  },
  {
    text: 'Какая форма соответствует синему цвету?',
    options: [
      'Квадрат',
      'Трапеция',
      'Круг',
      'Треугольник',
      'Эллипс',
      'Сферический треугольник',
    ],
    answer: 2,
  },
];

const Wrapper = styled.div`
  box-sizing: content-box;
  padding-top: 199px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const TestEl = styled.div`
  width: 60%;
  transition: opacity 1s;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  color: black;
`;

const Label = styled.label`
  display: block;
  padding: 20px 10px;
  input {
    display: none;
  }
  span {
    display: block;
    padding: 10px;
    font-size: 24px;
    background: transparent;
    border: 4px solid
      ${({ show, right }) => (show && ((right && 'green') || 'red')) || 'gray'};
    color: gray;
    border-radius: 4px;
    transition: background-color 0.5s;
  }
  input:checked ~ span {
    background: ${({ show, right }) =>
      (show && ((right && 'green') || 'red')) || 'gray'};
    color: white;
  }
`;

type OptProps = {
  name: string,
  value: boolean,
  onChange: () => void,
  text: string,
  show: boolean,
  right: boolean,
};

const Option = (props: OptProps) => (
  <Label show={props.show} right={props.right}>
    <input
      type="radio"
      name={props.name}
      checked={props.value}
      onChange={props.onChange}
    />
    <span>{props.text}</span>
  </Label>
);

type State = {
  task: number,
  currentAnswer: number,
  answerChecked: boolean,
  answers: number,
  opacity: number,
  showResults: boolean,
};

class Test extends React.Component<{}, State> {
  state: State;

  state = {
    task: 0,
    currentAnswer: -1,
    answerChecked: false,
    answers: 0,
    opacity: 1,
    showResults: false,
  };

  nextTask = () => {
    const { task } = this.state;
    if (task + 1 < tasks.length) {
      this.setState({
        opacity: 0,
        currentAnswer: -1,
      });
      setTimeout(() => {
        this.setState({
          opacity: 1,
          task: task + 1,
          answerChecked: false,
        });
      }, 1000);
    } else {
      this.setState({ showResults: true });
    }
  };

  onSelectAnswer = (index: number) => this.setState({ currentAnswer: index });

  checkAnswer = () => {
    const { task, currentAnswer, answers } = this.state;
    if (currentAnswer === tasks[task].answer) {
      this.setState({ answers: answers + 1, answerChecked: true });
    } else {
      this.setState({ answerChecked: true });
    }
  };

  render() {
    const {
      task,
      currentAnswer,
      answerChecked,
      opacity,
      showResults,
      answers,
    } = this.state;
    const taskItem = tasks[task];

    const button = (currentAnswer > -1 &&
      ((answerChecked && <Button onClick={this.nextTask}>Дальше</Button>) || (
        <Button onClick={this.checkAnswer}>Проверить ответ</Button>
      ))) || <Button style={{ opacity: 0 }}>Нет ответа</Button>;
    return (
      <Wrapper>
        {!showResults && (
          <TestEl style={{ opacity }}>
            <Task>{taskItem.text}</Task>
            <Options>
              {taskItem.options.map((opt, index) => (
                <Option
                  name={task}
                  value={index === currentAnswer}
                  onChange={
                    !answerChecked
                      ? () => this.onSelectAnswer(index)
                      : () => undefined
                  }
                  text={opt}
                  show={answerChecked}
                  right={index === taskItem.answer}
                />
              ))}
            </Options>
            <div style={{ textAlign: 'center' }}>{button}</div>
          </TestEl>
        )}
        {showResults && (
          <TestEl style={{ opacity }}>
            <Task>
              Ваш результат: {answers}/{tasks.length}
            </Task>
          </TestEl>
        )}
      </Wrapper>
    );
  }
}

export default Test;

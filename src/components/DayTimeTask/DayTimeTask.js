// @flow
import * as React from 'react';
import styled from 'styled-components';

import krymov1 from '../../images/krymov1.png';
import krymov2 from '../../images/krymov2.png';
import krymov3 from '../../images/krymov3.png';
// import krymov4 from '../../images/krymov4.png';
// import krymov5 from '../../images/krymov5.png';
// import krymov6 from '../../images/krymov6.png';
// import krymov7 from '../../images/krymov7.png';
// import krymov8 from '../../images/krymov8.png';
// import krymov9 from '../../images/krymov9.png';
import Task from '../Task/Task';

const IMAGES = [
  krymov1,
  krymov2,
  krymov3,
  // krymov4,
  // krymov5,
  // krymov6,
  // krymov7,
  // krymov8,
  // krymov9,
];

const HEIGHT = 1000;

const IMAGE_HEIGHT = 400;

const STEP_HEIGHT = HEIGHT / IMAGES.length;

const WINDOW_HEIGHT = window.innerHeight;

const OFFSET = Math.round((WINDOW_HEIGHT - IMAGE_HEIGHT) / 2);

const Wrapper = styled.div`
  height: ${HEIGHT + IMAGE_HEIGHT}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  justify-content: center;
`;

const ImagesWrapper = styled.div`
  position: sticky;
  top: ${(WINDOW_HEIGHT - IMAGE_HEIGHT) / 2}px;
  /* width: 100%; */
  height: ${IMAGE_HEIGHT}px;
`;

// $FlowFixMe
const Image = styled.img`
  width: 80vw;
  height: auto;
  /* height: ${IMAGE_HEIGHT}px; */

  opacity: ${({ opacity }) => opacity || 1};
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  transition: opacity 0.7s ease-out;
`;

const ImageDescription = styled.div`
  width: 40%;
  position: sticky;
  top: ${(WINDOW_HEIGHT - IMAGE_HEIGHT) / 2}px;
  height: ${IMAGE_HEIGHT}px;
  margin: 0;
  font-family: Merriweather;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
  padding-right: 5%;
`;

const Family = styled.span`
  font-size: 50px;
`;

const GivenName = styled.span`
  font-size: 21px;
`;

type State = {
  opacities: Array<number>,
};

class DayTimeTask extends React.Component<{}, State> {
  wrapperRef: *;

  isInitialized: boolean;

  startY: number;

  lastIndex: number;

  state: State;

  constructor() {
    super();

    this.wrapperRef = React.createRef();
    this.isInitialized = false;
    this.startY = -1;
    this.lastIndex = 0;
    const opacities = [];
    for (let i = 0; i < IMAGES.length; i += 1) {
      opacities.push((i === 0 && 1) || 0);
    }
    this.state = {
      opacities,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    // console.log('scroll...');
    if (!this.isInitialized) {
      this.initialize();
    } else {
      this.calculateOpacity();
    }
    // if (wrapper.getYOffset) {
    //   console.log({ top: wrapper.getBoundingClientRect().top });
    // }
  };

  initialize = () => {
    const wrapper = this.wrapperRef.current;
    console.log({ first: wrapper.offsetTop - OFFSET, second: window.scrollY });
    if (wrapper && wrapper.offsetTop - OFFSET === window.scrollY) {
      this.isInitialized = true;
      this.startY = window.scrollY;
      console.log('initialized');
    }
  };

  calculateOpacity = () => {
    console.log('calculateOpacity');
    const { opacities } = this.state;
    const index = Math.trunc((window.scrollY - this.startY) / STEP_HEIGHT);
    console.log({ index, lastIndex: this.lastIndex });
    const condition =
      index !== this.lastIndex && index >= 0 && index < opacities.length;
    if (condition) {
      console.log('condition is true');
      // const newOpacities = [...opacities];
      const newOpacities = new Array(IMAGES.length).fill(0);
      for (let i = 0; i <= index; i += 1) {
        newOpacities[i] = 1;
      }
      // newOpacities[this.lastIndex] = 0;
      this.setState({ opacities: newOpacities });
      this.lastIndex = index;
      console.log({ lastIndex: this.lastIndex });
    }
  };

  render() {
    const { opacities } = this.state;
    console.log({ opacities });
    return (
      <div>
        <Task>Продолжайте листать</Task>
        <Wrapper>
          {/* <ImageDescription>
            <Family>Крымов</Family>
            <br /> <GivenName>Николай Петрович.</GivenName> <br />
            Изменение в пейзаже отношений по тону и цвету в разное время суток.
            Учебный пейзаж-таблица, 1934
          </ImageDescription> */}
          <ImagesWrapper ref={this.wrapperRef}>
            <div style={{ position: 'relative' }}>
              {IMAGES.map((image, index) => (
                <Image
                  src={image}
                  alt=""
                  opacity={opacities[index].toString()}
                  key={image.slice(0, 4)}
                />
              ))}
            </div>
          </ImagesWrapper>
          <div />
        </Wrapper>
      </div>
    );
  }
}

export default DayTimeTask;

// @flow
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import * as React from 'react';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';

import { PADDING_PAGE } from '../../constants';

import coloredCircle from '../../images/colored circle.png';
import spectrum from '../../images/spectrum.png';
import spectrumFull from '../../images/spectrum-full.png';
import coloredCircle2 from '../../images/colored-circle-2.png';
import tones from '../../images/tones.png';
import purpleRect from '../../images/purple-rect.png';
import purpleYellowRect from '../../images/purple-and-yellow-rect.png';

import TriangleTask from '../../components/TriangleTask/TriangleTask';
import PickColorTask from '../../components/PickColorTask/PickColorTask';
import MultiplyColorTask from '../../components/MultiplyColorTask/MultiplyColorTask';
import DayTimeTask from '../../components/DayTimeTask/DayTimeTask';
import GradientTask from '../../components/GradientTask/GradientTask';
import Spectrum from '../../components/Spectrum/Spectrum';
import PerceptColorTask from '../../components/PerceptColorTask/PerceptColorTask';
import Book from '../../components/Book/Book';
import Test from '../../components/Test/Test';

type ReactObjRef<ElementType: React.ElementType> = {
  current: null | React.ElementRef<ElementType>,
};

const MainEl = styled.main`
  /* padding: 0 ${PADDING_PAGE}; */
  background: black;
  color: white;
  padding-bottom: 60px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  > img {
    flex: 0 0 auto;
    max-height: 500px;
  }
`;

const MainWord = styled.strong`
  color: #a31313;
`;

type State = {
  navbarHeight: number,
  activePage: number,
};

class HomePage extends React.Component<{}, State> {
  navbarRef: ReactObjRef<'nav'>;

  state: State = {
    navbarHeight: 0,
    activePage: 0,
  };

  constructor(props: {}) {
    super(props);

    this.navbarRef = React.createRef();
  }

  componentDidMount() {
    return (
      this.navbarRef.current &&
      this.setState({ navbarHeight: this.navbarRef.current.clientHeight })
    );
  }

  setActivePage = (page: number) => {
    this.setState({ activePage: page });
  };

  render() {
    const { navbarHeight, activePage } = this.state;
    const tasks = (
      <section>
        <Section style={{ paddingTop: navbarHeight }}>
          <ImageContainer>
            <img src={coloredCircle} alt="" />
            <img src={spectrum} alt="" />
          </ImageContainer>
        </Section>
        <Header>Теория цвета</Header>
        <Section white>
          <p>
            <MainWord>Колористика</MainWord> - наука о цвете, включающая знания
            о природе цвета, основных, составных и дополнительных цветах,
            характеристиках цвета, цветовых контрастах, смешении цветов,
            колорите, цветовой гармонии, цветовой культуре и языке цвета.
          </p>
        </Section>
        <Section>
          <Spectrum />
        </Section>
        <Section white>
          <p>
            <MainWord>Цветоведение</MainWord> - это анализ процесса восприятия и
            различения цвета на основе систематизированных сведений из физики,
            физиологии и психологии.
          </p>
        </Section>
        <Section white>
          <p>
            <MainWord>Цвет</MainWord> (англ. сolour, франц. сouleur, нем. farbe)
            — это свойство материальных объектов излучать и отражать световые
            волны определенной части спектра. В широком значении цвет означает
            сложную совокупность градаций, взаимодействий, изменчивость тонов и
            оттенков. Видимый человеком цвет возникает, с одной стороны, под
            влиянием объективного физического явления — света, с другой — в
            результате электромагнитного излучения различных частот на
            зрительный аппарат человека. Помимо этих факторов, на возникновение
            цветового ощущения человека влияют зрительный опыт и память,
            физиологические и психологические особенности.
          </p>
        </Section>
        <Section white header="Спектральный круг">
          <p>Проще считать, что основных цветов спектра есть двенадцать:</p>
          <ImageContainer>
            <img src={coloredCircle2} alt="" />
            <img src={coloredCircle2} alt="" />
          </ImageContainer>
          <p>
            Все спектральные цвета называются хроматическими.  Все остальные
            цвета получаются путем смешения основных.  Серый белый и черный
            называются ахроматическими:
          </p>
          <ImageContainer>
            <img src={tones} alt="" />
          </ImageContainer>
          <p>
            Взаимодополнительными цветами являются противоположно расположенные
            цвета в спектре. Они друг-друга дополняют, то-есть, когда
            взаимодополнительные цвета расположены рядом, то они усиливают друг
            друга, &#34;зажигают&#34;.  Например, у нас есть вот такой
            невзрачный тусклый фиолетовый цвет: 
          </p>
          <ImageContainer>
            <img src={purpleRect} alt="" />
          </ImageContainer>
          <p>
            Сам по себе он не несет особой красоты и мало что из себя нам может
            рассказать. Но если к нему добавить взаимодополнительный цвет, то он
            заиграет и заискрится. Смотрите:
          </p>
          <ImageContainer>
            <img src={purpleYellowRect} alt="" />
          </ImageContainer>
        </Section>
        <Header>Практические упражнения</Header>
        <Section white>
          <PickColorTask />
        </Section>
        <Section white>
          <TriangleTask />
        </Section>
        <Section white>
          <DayTimeTask />
        </Section>
        <Section white>
          <MultiplyColorTask />
        </Section>
        <Section white>
          <GradientTask />
        </Section>
        <Section>
          <PerceptColorTask />
        </Section>
      </section>
    );
    const text = <Book />;
    const test = <Test />;
    return (
      <MainEl>
        <Navbar navbarRef={this.navbarRef} setActivePage={this.setActivePage} />
        {activePage === 0 && tasks}
        {activePage === 1 && text}
        {activePage === 2 && test}
      </MainEl>
    );
  }
}

export default HomePage;

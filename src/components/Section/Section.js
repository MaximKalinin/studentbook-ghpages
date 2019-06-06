// @flow
import * as React from 'react';
import styled from 'styled-components';

import { PADDING_PAGE } from '../../constants';

// type SectionElProps = {
//   white?: boolean,
// };

// $FlowFixMe
const SectionEl = styled.section`
  margin: 40px ${PADDING_PAGE} 0 ${PADDING_PAGE};
  padding: ${({ white }) => (white && '20px') || '0px'};
  background: ${({ white }) => (white && 'white') || ''};
  color: ${({ white }) => (white && 'black') || 'white'};
  border-radius: 20px;
`;

const Header = styled.h3`
  font-family: Times serif;
`;

type Props = {
  header?: string,
  style?: {},
  children?: *,
  white?: boolean,
};

const Section = (props: Props) => {
  const { header, style, white } = props;
  return (
    <div className="sectionWrapper" style={style}>
      <SectionEl white={white}>
        {header && <Header>{header}</Header>}
        {props.children}
      </SectionEl>
    </div>
  );
};

export default Section;

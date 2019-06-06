// @flow
import * as React from 'react';
import styled from 'styled-components';

import { PADDING_PAGE } from '../../constants';

const HeaderEl = styled.h2`
  color: #eabeff;
  font-size: 23px;
  padding: 0 ${PADDING_PAGE};
  font-family: Times serif;
`;

type Props = {
  children: *,
};

const Header = (props: Props) => <HeaderEl>{props.children}</HeaderEl>;

export default Header;

// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button from '../Button/Button';

import { PADDING_PAGE } from '../../constants';

type ReactObjRef<ElementType: React.ElementType> = {
  current: null | React.ElementRef<ElementType>,
};

const menuItems = ['Интерактив', 'Теория', 'Тест'];

const SCROLL_DIFF = 50;

// $FlowFixMe
const NavbarEl = styled.nav`
  position: fixed;
  /* width: calc(100% - ${PADDING_PAGE} - ${PADDING_PAGE}); */
  padding: 0 ${PADDING_PAGE};
  width: 100%;
  box-sizing: border-box;
  background: #4f0909;
  z-index: 3;
  transform: ${({ show }) => (show && 'none') || 'translatey(-100%)'};
  transition: .3s;
`;

const MenuEl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  color: #f4b000;
  text-align: center;
  font-family: Times serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 46px;
  margin-bottom: 10px;
`;

// const ButtonEl = styled.button`
//   cursor: pointer;
//   background: linear-gradient(180deg, #fde50c 0%, #b68300 100%);
//   border: none;
//   color: #7513a3;
//   font-family: Times serif;
//   padding: 20px;
//   font-size: 23px;
//   margin: 20px 0;
// `;

type Props = {
  navbarRef: ReactObjRef<'nav'>,
  setActivePage: (page: number) => void,
};

type State = {
  pageOffset: number,
  show: boolean,
};

class Navbar extends React.Component<Props, State> {
  props: Props;

  state: State = {
    pageOffset: 0,
    show: true,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    const { pageOffset } = this.state;
    let newProps = null;
    const scrollDiff = window.pageYOffset - pageOffset;
    if (scrollDiff < -SCROLL_DIFF) {
      newProps = { show: true, pageOffset: window.pageYOffset };
    } else if (scrollDiff > SCROLL_DIFF) {
      newProps = { show: false, pageOffset: window.pageYOffset };
    }
    this.setState(newProps);
  };

  render() {
    const { navbarRef, setActivePage } = this.props;
    const { show } = this.state;
    return (
      <NavbarEl ref={navbarRef} show={show}>
        <Header>ЦВЕТОВЕДЕНИЕ И КОЛОРИСТИКА</Header>
        <MenuEl>
          {menuItems.map((item, index) => (
            <Button
              type="button"
              key={item}
              onClick={() => setActivePage(index)}
            >
              {item}
            </Button>
          ))}
        </MenuEl>
      </NavbarEl>
    );
  }
}
export default Navbar;

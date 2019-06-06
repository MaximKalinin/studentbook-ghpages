// @flow
import * as React from 'react';
import { ChromePicker } from 'react-color';

import type { Color, Position } from '../../utils/utils';
import { POSITIONS } from '../../utils/utils';

type Props = {
  close: () => void,
  onChangeComplete: (color: { rgb: * }) => void,
  color: Color,
  position?: Position,
};

type State = {
  wrapperStyle: {
    left: string,
    position: string,
    top: string,
    zIndex: string,
    transform: string,
    padding: string,
  },
};

class ColorPicker extends React.Component<Props, State> {
  props: Props;

  wrapperRef: *;

  constructor(props: Props) {
    super(props);

    const { position } = props;

    this.wrapperRef = React.createRef();
    const initialWrapperStyle = {
      position: 'absolute',
      top: '0%',
      left: '100%',
      zIndex: '3',
      transform: 'none',
      padding: '20px',
    };

    switch (position) {
      case POSITIONS.LEFT:
        initialWrapperStyle.left = '0%';
        initialWrapperStyle.transform = 'translateX(-100%)';
        break;
      default:
        break;
    }

    this.state = {
      wrapperStyle: initialWrapperStyle,
    };
  }

  componentDidMount() {
    const { wrapperStyle } = this.state;

    document.addEventListener('mousedown', this.handleClickOutside);

    const wrapperEl = this.wrapperRef.current;
    const newWrapperStyle = { ...wrapperStyle };
    if (wrapperEl) {
      const { top, right, bottom, left } = wrapperEl.getBoundingClientRect();
      let newTop = 0;
      let newLeft = 0;
      if (top < 0) {
        newTop -= top;
      }
      if (bottom > window.innerHeight) {
        newTop -= bottom - window.innerHeight;
      }
      if (left < 0) {
        newLeft -= left;
      }
      if (right > window.innerWidth) {
        newLeft -= right - window.innerWidth;
      }
      if (newTop !== 0) {
        newWrapperStyle.top = `${newTop}px`;
      }
      if (newLeft !== 0) {
        newWrapperStyle.left = `${newLeft}px`;
      }
      this.setState({ wrapperStyle: newWrapperStyle });
    }
  }

  componendWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: *) => {
    const { close } = this.props;
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      close();
    }
  };

  state: State = {
    wrapperStyle: {},
  };

  render() {
    const { close, onChangeComplete, color } = this.props;
    const { wrapperStyle } = this.state;
    return (
      <div>
      {false && <div onClick={close} role="close" style={{position: 'fixed', top: '0', left: '0', bottom: '0', right: '0'}} />} {/*eslint-disable-line*/}
        {/* $FlowFixMe */}
        <div style={wrapperStyle} ref={this.wrapperRef}>
          <ChromePicker onChangeComplete={onChangeComplete} color={color} />
        </div>
      </div>
    );
  }
}

export default ColorPicker;

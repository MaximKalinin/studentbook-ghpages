import styled from 'styled-components';

import checkmark from '../../images/checkmark.png';
import wrong from '../../images/wrong.png';

// $FlowFixMe
const Answer = styled.div`
  position: absolute;
  background-color: ${({ correct }) => (correct && 'green') || 'red'};
  height: 20px;
  width: 20px;
  bottom: 0;
  right: 0;
  margin: 10px;
  background: ${({ correct }) => `url(${(correct && checkmark) || wrong})`};
  background-size: contain;
  background-repeat: no-repeat;
`;

export default Answer;

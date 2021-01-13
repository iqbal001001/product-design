import React, {forwardRef, useImperativeHandle} from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.3);
`

export const Box = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 30%;
    width: 80%;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
    z-index: 101;
    padding: 40px;
`
//reference : https://www.youtube.com/watch?v=SmMZqh1xdB4
const Modal = forwardRef((props,ref) => {
  const [display, setDisplay] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close()
    }
  });

  const open = () => {
    setDisplay(true)
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <Wrapper>
        <Backdrop onClick={close} />
        <Box>
          {props.children}
        </Box>
      </Wrapper>, document.getElementById("modal-root"))
  }

  return null;

});

export default Modal
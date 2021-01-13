import React from 'react';
import { useSelector } from "react-redux";

import styled from 'styled-components';

export const ErrorStyle = styled.div`
    background: red;
    Display: flex;
`

const Error = ({children}) => {
    return (<ErrorStyle>{children}</ErrorStyle> );
}

const ErrorSection = () => {
    const errorString = useSelector(state =>state.errorString);

  return (
    <React.Fragment> 
            <Error>{errorString}</Error>
    </React.Fragment>
  );
};

export default ErrorSection;
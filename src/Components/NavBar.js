import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash'; 

export const NavStyle = styled.div`
    display: flex;
    justify-content: space-round;
    align-items: center;
    min-height: 10vh;
    background: rgb(73,79,82);
    color: white;

    .links {
        width: 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        list-style: none;
    }

    .link {
        color: white;
    }
`

const NavBar = () => {
 //const errorString = useSelector(state =>state.errorString);

  return (
    <React.Fragment> 
        <NavStyle>
            <h3>PDS</h3>
            <ul className="links">
                <Link className="link" to="/productlist">
                    <li>Product</li>
                </Link>
                <Link className="link" to="/featurelist">
                    <li>Feature</li>
                </Link>
                <Link className="link" to="/clinicalCategorylist">
                    <li>ClinicalCategory</li>
                </Link>
                <Link className="link" to="/Itemlist">
                    <li>Item</li>
                </Link>
                <Link className="link" to="/WorkFlowItemList">
                    <li>WorkFlow</li>
                </Link>
            </ul>
        </NavStyle>
    </React.Fragment>
  );
};

export default NavBar;


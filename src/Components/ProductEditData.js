import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadSuite,  SaveSuite } from "../Store/Product/suite";
import styled from 'styled-components';

import ProductEdit from "./productEdit";
import  { ProductService } from "../Service/ProductService";
import { useParams } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductEditData = () => {
   // const [suite, setSuite] = useState(ProductSrv.getNewSuite());
     const suite = useSelector(state => state.entities.suite);
     const originalSuite = useSelector(state => state.entities.originalSuite);
     const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const { Id } = useParams();
  
  const productSrv = new ProductService();

  useEffect( () => {
    LoadSuite()
   }, []);


   const LoadSuite = async() => {

      let suite = {};
      if (Id === "new"){
        suite = productSrv.getNewSuite();
      }else{
       // suite = await productSrv.getSuiteWithVersions(Id);
       suite = dispatch(loadSuite(Id));
      }
      console.log(suite);
     // dispatch(updateSuite(suite));

   }

   const Save = async(suite) => {
    console.log(suite)
    let s = {};
      if (suite.Id === 0){
        //s = await productSrv.SaveSuiteWithDependents(suite);
        dispatch(SaveSuite(suite));
        let newLocation = location.pathname.replace("/new", "/" + s.Id );
        history.push(newLocation);
      }else{
       // s = await productSrv.SaveSuiteWithDependents({...suite, versions: []});
        dispatch(SaveSuite(suite));
      }
   // console.log(s);
   // dispatch(updateSuite(s));
   return s;
   }

  return (
    <React.Fragment> 
      <Container>
       <ProductEdit selected = {suite} onSave = {Save}/>
      </Container>
    </React.Fragment>
  );
};

export default ProductEditData;


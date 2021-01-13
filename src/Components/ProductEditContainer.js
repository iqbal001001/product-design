import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadSuite, updateSuite, SaveSuite } from "../Store/Product/suite";
import styled from 'styled-components';

import ProductEdit from "./productEdit";
import  { ProductService } from "../Service/ProductService";
import { useParams } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'; 

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductEditContainer = () => {
   // const [suite, setSuite] = useState(ProductSrv.getNewSuite());
     const suite = useSelector(state => state.entities.suite);
     const originalSuite = useSelector(state => state.entities.originalSuite);
     const [isDirtySuite, setIsDirtySuite] = useState(false);

     const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const { Id } = useParams();
    
    const productSrv = new ProductService();

  useEffect( () => {
    LoadSuite()
   }, []);

   useEffect( () => {
     if (suite && location.pathname.indexOf("/new") > -1 && suite.Id > 0){
      let newLocation = location.pathname.replace("/new", "/" + suite.Id );
           history.push(newLocation);
     }
        handleIsDirtySuite()
    },[suite]);
    
    
    useEffect( () =>{
        handleIsDirtySuite()
    },[originalSuite]);
    
    
    const handleIsDirtySuite = () =>{
        let isDirtTemplate = !_.isEqual(suite, originalSuite);
        
        setIsDirtySuite(isDirtTemplate);
    }

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

   const Change = (s) => {
    (!_.isEqual(suite, s)) && dispatch(updateSuite(s));
   }


   const Save = async(s) => {
    console.log(s)

        dispatch(SaveSuite(s));

   return s;
   }

  //  const Save = async(suite) => {
  //   console.log(suite)
  //   let s = {};
  //     if (suite.Id === 0){
  //       //s = await productSrv.SaveSuiteWithDependents(suite);
  //       dispatch(SaveSuite(suite));
  //       let newLocation = location.pathname.replace("/new", "/" + s.Id );
  //       history.push(newLocation);
  //     }else{
  //      // s = await productSrv.SaveSuiteWithDependents({...suite, versions: []});
  //       dispatch(SaveSuite(suite));
  //     }
  //  // console.log(s);
  //  // dispatch(updateSuite(s));
  //  return s;
  //  }

  return (
    <React.Fragment> 
      <Container>
       <ProductEdit 
        selected = {suite} 
        originalSelected = {originalSuite} 
        onChange = {Change}
        onSave = {isDirtySuite && Save}/>
      </Container>
    </React.Fragment>
  );
};

export default ProductEditContainer;


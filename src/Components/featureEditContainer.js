import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadFeature, updateFeature, saveFeature } from "../Store/Feature/feature";
import styled from 'styled-components';

import FeatureEdit from "./featureEdit";
import  { FeatureService } from "../Service/FeatureService";
import { useParams } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'; 

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const FeatureEditContainer = () => {
   // const [suite, setSuite] = useState(ProductSrv.getNewSuite());
     const feature = useSelector(state => state.entities.feature);
     const originalFeature = useSelector(state => state.entities.originalFeature);
     const [isDirtyFeature, setIsDirtyFeature] = useState(false);

     const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const { Id } = useParams();
    
    const featureSrv = new FeatureService();

  useEffect( () => {
    LoadSuite()
   }, []);

   useEffect( () => {
    if (feature && location.pathname.indexOf("/new") > -1 && feature.Id > 0){
      let newLocation = location.pathname.replace("/new", "/" + feature.Id );
           history.push(newLocation);
     }
        handleIsDirtyFeature()
    },[feature]);
    
    
    useEffect( () =>{
        handleIsDirtyFeature()
    },[originalFeature]);
    
    
    const handleIsDirtyFeature = () =>{
        let isDirtTemplate = !_.isEqual(feature, originalFeature);
        
        setIsDirtyFeature(isDirtTemplate);
    }

   const LoadSuite = async() => {

      let suite = {};
      if (Id === "new"){
        suite = featureSrv.getNewFeature();
      }else{
       // suite = await productSrv.getSuiteWithVersions(Id);
       suite = dispatch(loadFeature(Id));
      }
      console.log(suite);
     // dispatch(updateSuite(suite));

   }

   const Change = (f) => {
    (!_.isEqual(feature, f)) && dispatch(updateFeature(f));
   }

   const Save = async(f) => {
     console.log(f)
  //   let f = {};
  //     if (feature.Id === 0){
  //       //s = await productSrv.SaveSuiteWithDependents(suite);
  //       dispatch(saveFeature(feature));
  //       let newLocation = location.pathname.replace("/new", "/" + f.Id );
  //       history.push(newLocation);
  //     }else{
  //      // s = await productSrv.SaveSuiteWithDependents({...suite, versions: []});
        dispatch(saveFeature(f));
  //     }
  //  // console.log(s);
  //  // dispatch(updateSuite(s));
   return f;
   }

  return (
    <React.Fragment> 
      <Container>
       <FeatureEdit 
        selected = {feature} 
        originalSelected = {originalFeature} 
        onChange = {Change}
        onSave = {isDirtyFeature && Save}/>
      </Container>
    </React.Fragment>
  );
};

export default FeatureEditContainer;


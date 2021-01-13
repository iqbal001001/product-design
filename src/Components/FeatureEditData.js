import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadFeature,  saveFeature } from "../Store/Feature/feature";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FeatureService } from "../Service/FeatureService";
import { useLocation, useHistory } from 'react-router-dom'
import FeatureEdit from './featureEdit';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const FeatureEditData = () => {
  //const featureSrv = new FeatureService();
  const feature =  useSelector(state => state.entities.feature);
  //const [feature, setFeature] = useState(featureSrv.getNewFeature());

  const location = useLocation();
  const history = useHistory();

  const { Id } = useParams();
  const dispatch = useDispatch();

  useEffect( () => {
    LoadFeature();
   }, []);

   useEffect( () => {
    if (feature && feature.Id > 0 && Id === "new"){
      let newLocation = location.pathname.replace("/new", "/" + feature.Id );
           history.push(newLocation);
    }
   }, [feature]);

   const LoadFeature = async() => {
     if (Id > 0)
      dispatch(loadFeature(Id));
    // let f = {};
    // if (Id === "new"){
    //   f = featureSrv.getNewFeature();
    //            f.GroupId = 1;
    //   f.TypeId = 1;
    // }else{
      
    //    let list = await featureSrv.getFeatureWithItem(Id);
    //    f = list[0];
    // }
 
    // setFeature(f);
   }

  // const SaveFeature = async(feature) => {
  //   dispatch(SaveFeature(feature));
  //   // let f = {};
  //   //   if (feature.Id === 0){
  //   //     f = await featureSrv.SaveFeatureWithItems(feature);
  //   //     let newLocation = location.pathname.replace("/new", "/" + f.Id );
  //   //     history.push(newLocation);
  //   //   }else{
  //   //     f = await featureSrv.SaveFeatureWithItems({...feature, Items: []});
  //   //   }
  //   //   setFeature(f);
  //   //   return f;
  // }

  return (
    <React.Fragment> 
      <Container>
     <FeatureEdit />
      </Container>
    </React.Fragment>
  );
};

export default FeatureEditData;


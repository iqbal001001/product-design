import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateVersion,  SaveVersion } from "../Store/Product/version";
import { updateOriginalVersion } from "../Store/Product/originalVersion";
import styled from 'styled-components';
import BitCheckBoxes from './BitCheckBoxes';
import { AwesomeButton } from "react-awesome-button";
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ListDragAndDrop from './dnd/ListDragAndDrop';
import _ from 'lodash';

import { ProductService } from "../Service/ProductService";

export const Container = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;

    .header{
        background: red;
        display: flex;
    }
    .mid{
        background: orange;
        display: flex;
    }
    .footer{

    }
`

const VersionDetail = ({mode, selected, onSave}) => {
    const version = useSelector(state => state.entities.version);
    const originalVersion = useSelector(state => state.entities.originalVersion);
    const [productLines, setProductLines] = useState([]);
    const [isDirtyVersion, setIsDirtyVersion] = useState(false);

    const productSrv = new ProductService();

    const dispatch = useDispatch();

    useEffect(() =>{
      if(selected){
        dispatch(updateVersion(selected));
        dispatch(updateOriginalVersion(selected));
        setProductLines(selected.ProductLines?? []);
      }
    },[selected]);


  useEffect( () =>{
    if (version){
      let v = _.cloneDeep(version);
      v.ProductLines = productLines
      dispatch(updateVersion(v));
    }
},[productLines]);

useEffect( () =>{
  handleIsDirtyVersion()
},[version]);


useEffect( () =>{
  handleIsDirtyVersion()
},[originalVersion]);


const handleIsDirtyVersion = () =>{
  let isDirtTemplate = !_.isEqual(version, originalVersion);

  setIsDirtyVersion(isDirtTemplate);
}

      const SaveVersion =  async() => {
          console.log(version)
          let v = {};
          let savedToDB = false;
          if (version.SuiteId && version.SuiteId > 0){
           // v = await productSrv.SaveVersionWithDependents(version);
           dispatch(SaveVersion(version));
            savedToDB = true;
          }else{
            v = _.cloneDeep(version);
            v.ApprovalStatus = "Pending";
            dispatch(updateVersion(v));
            dispatch(updateOriginalVersion(v));
          }
        
        console.log(v);
       //let v = {...version, Id};
      //  setVersion(v);
      //  setOriginalVersion(v);
       onSave(v, savedToDB, mode);
      }

    

  

    return (
      
          <Container>
        <h1>Version detail - {version?.Id} -  suite - {version?.SuiteId}</h1>
        {isDirtyVersion && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveVersion();
                  }}
                  >
                  {version.Id > 0 || version.ApprovalStatus === "Pending"? "Save" : "Create"}
        </AwesomeButton>}
       
         
        </Container>
    );
}

export default VersionDetail;
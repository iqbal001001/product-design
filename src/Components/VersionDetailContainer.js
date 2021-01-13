import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadVersion, updateVersion, SaveVersion } from "../Store/Product/version";
import { updateOriginalVersion } from "../Store/Product/originalVersion";
import styled from 'styled-components';
import VersionDetail from "./VersionDetail";

import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'


//import * as ProductSrv from "../Service/ProductService";
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

const VersionDetailContainer = () => {
    // const [version, setVersion] = useState(null);
    // const [originalVersion, setOriginalVersion] = useState(null);
    const version = useSelector(state => state.entities.version);
    const originalVersion = useSelector(state => state.entities.originalVersion);
   // const [productLines, setProductLines] = useState([]);
    const [isDirtyVersion, setIsDirtyVersion] = useState(false);

    const dispatch = useDispatch();

    const location = useLocation();
  const history = useHistory();

  const { Id } = useParams();
  
  const productSrv = new ProductService();

  useEffect( () => {
    LoadVersion()
   }, []);


   const LoadVersion = async() => {

      let suite = {};
      if (Id === "new"){
        suite = productSrv.getNewVersion();
      }else{
       // suite = await productSrv.getSuiteWithVersions(Id);
       suite = dispatch(loadVersion(Id));
      }
      console.log(suite);
     // dispatch(updateSuite(suite));

   }

   const Change = (suite) => {
    dispatch(updateVersion(suite));
   }

   const Save = async(version) => {
    console.log(version)
    let s = {};
      if (version.Id === 0){
        //s = await productSrv.SaveSuiteWithDependents(suite);
        dispatch(SaveVersion(version));
        let newLocation = location.pathname.replace("/new", "/" + s.Id );
        history.push(newLocation);
      }else{
       // s = await productSrv.SaveSuiteWithDependents({...suite, versions: []});
        dispatch(SaveVersion(version));
      }
   // console.log(s);
   // dispatch(updateSuite(s));
   return s;
   }


//   useEffect( () =>{
//     if (version){
//       let v = _.cloneDeep(version);
//       v.ProductLines = productLines
//       dispatch(updateVersion(v));
//     }
// },[productLines]);

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

    //   const SaveVersion =  async() => {
    //       console.log(version)
    //       let v = {};
    //       let savedToDB = false;
    //       if (version.SuiteId && version.SuiteId > 0){
    //        // v = await productSrv.SaveVersionWithDependents(version);
    //        dispatch(SaveVersion(version));
    //       //  savedToDB = true;
    //       }else{
    //         v = _.cloneDeep(version);
    //         v.ApprovalStatus = "Pending";
    //         dispatch(updateVersion(v));
    //         dispatch(updateOriginalVersion(v));
    //       }
        
    //     console.log(v);
    //    //let v = {...version, Id};
    //   //  setVersion(v);
    //   //  setOriginalVersion(v);
    //    //onSave(v, savedToDB, mode);
    //   }

    

  

    return (
      
          <Container>
              <VersionDetail
                selected = {version} 
                onChange = {Change}
                onSave = {Save}/>
        </Container>
    );
}

export default VersionDetailContainer;
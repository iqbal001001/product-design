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

const VersionDetail = ({mode, selected, onChange, onSave}) => {
     const [version, setVersion] = useState(null);

    const [productLines, setProductLines] = useState([]);
    const [productCodes, setProductCodes] = useState([]);
    const [options, setOptions] = useState([]);
    //const [isDirtyVersion, setIsDirtyVersion] = useState(false);

    const productSrv = new ProductService();

    const dispatch = useDispatch();

    useEffect(() =>{
      if(selected){
        // dispatch(updateVersion(selected));
        setVersion(selected);
        // dispatch(updateOriginalVersion(selected));
        setProductLines(selected.ProductLines?? []);
        loadCodes();
      }
    },[selected]);

    useEffect( () =>{
      setOptions(getOptions(productCodes));
  },[productCodes]);

  useEffect( () =>{
    if (version){
      let v = _.cloneDeep(version);
      v.ProductLines = productLines
     // dispatch(updateVersion(v));
     setVersion(v)
    }
},[productLines]);

useEffect( () =>{
  //handleIsDirtyVersion()
  version && onChange && onChange(version);
},[version]);


// useEffect( () =>{
//   handleIsDirtyVersion()
// },[originalVersion]);


// const handleIsDirtyVersion = () =>{
//   let isDirtTemplate = !_.isEqual(version, originalVersion);

//   setIsDirtyVersion(isDirtTemplate);
// }

    const loadCodes = async() => {
      let items = await productSrv.getProductCodes();
            let is = items.map((item) => {
              return {...item, isAvailable: true, label: item.Code}
            })
            setProductCodes(is);
          //  setOptions(getOptions(is));
    }

    const getOptions = (items) => {
      let is = _.cloneDeep(items);
        return is
          .map((i) => {
            return {label: i.label, isAvailable: i.isAvailable, value:i.Id}
      })
    }

       var  SalesChannels =
       {
           None: 0,
           ContactCentre: 1,
           Online: 2,
           Aggregators: 4
       }
   
       var Scales = 
       {
           None: 0,
           Single: 1,
           Couple: 2,
           Family: 4,
           SingleParentFamily: 8
       }
   
       var ScaleQuoteMaps =
       {
           None: 0,
           SingleToSingle: 1,
           CoupleToCouple: 2,
           CoupleToFamily: 4,
           FamilyToCouple: 8,
           FamilyToFamily: 16,
           SingleParentFamilyToCouple: 32,
           SingleParentFamilyToFamily: 64,
           SingleParentFamilyToSingleParentFamily: 128
       }


      var StateCovers = 
      {
          None: 0,
          NSW: 1,
          QLD: 2,
          SA: 4,
          TAS: 8,
          VIC: 16,
          WA: 32,
          ACT: 64,
          NT: 128
      }

      // const SaveVersion =  async() => {
      //     console.log(version)
      //     let v = {};
      //     let savedToDB = false;
      //     if (version.SuiteId && version.SuiteId > 0){
      //      // v = await productSrv.SaveVersionWithDependents(version);
      //      dispatch(SaveVersion(version));
      //       savedToDB = true;
      //     }else{
      //       v = _.cloneDeep(version);
      //       v.ApprovalStatus = "Pending";
      //       dispatch(updateVersion(v));
      //       dispatch(updateOriginalVersion(v));
      //     }
        
      //   console.log(v);
      //  //let v = {...version, Id};
      // //  setVersion(v);
      // //  setOriginalVersion(v);
      //  onSave(v, savedToDB, mode);
      // }


      const setField = ({target}) => {
        setVersion({...version, [target.name]: target.value});
       // onChange && onChange(version);
      };

      const setBit = (target) => {
        setVersion({...version, [target.name]: target.value});
       // onChange && onChange(version);
      };

      const setOption = ({target}) => {
        setVersion({...version, [target.name]: target.value === "on"? true : false});
       // onChange && onChange(version);
      };

      const onProductLinesChange = (selectedValues) => {
        let cItems = [...productLines];
        let cItemIds = cItems.map(x => x.ProductCodeId);

        let deletedItems = _.difference(cItemIds,selectedValues);
        cItems = cItems.filter(x=>!deletedItems.includes(x.ProductCodeId) )

        let addedItems = _.difference(selectedValues,cItemIds);
        addedItems.map((id)=>{
         return cItems.push(
          productSrv.getNewProductLine(selected.Id, id)
           );
        })
        setProductLines(cItems);
      };

      const onProductLinesClick = (id) => {
        console.log(id);
      }
    return (
      
          <Container>
        <h1>Version detail - {version?.Id} -  suite - {version?.SuiteId}</h1>
        {onSave && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveVersion();
                  }}
                  >
                  {version.Id > 0 || version.ApprovalStatus === "Pending"? "Save" : "Create"}
        </AwesomeButton>}
        {version && <div>
          <Moment format="YYYY/MM/DD" date ={version?.StartDate}/> - <Moment format="YYYY/MM/DD" date ={version?.EndDate}/>
          <DatePicker selected={Date.parse(version.StartDate)} onChange={date => setVersion({...version, StartDate:date})} />
          <DatePicker selected={Date.parse(version.EndDate)} onChange={date => setVersion({...version, EndDate:date})} />
        </div>}
       
        {version && <Tabs forceRenderTabPanel={"false"}>
    <TabList >
      <Tab>Detail</Tab>
      <Tab>Product Codes</Tab>
    </TabList>

    <TabPanel show={"true"}>
    <div className = "header">
            <BitCheckBoxes items= {SalesChannels} value = {version.SalesChannels} name= "SalesChannels" onChange={setBit}/>
            <BitCheckBoxes items= {StateCovers} value = {version.StateCoverge} name= "StateCoverge" onChange={setBit}/>
            <BitCheckBoxes items= {Scales} value = {version.Scale} name= "Scale" onChange={setBit}/>
            <BitCheckBoxes items= {ScaleQuoteMaps} value = {version.ScaleQuoteMap} name= "ScaleQuoteMap" onChange={setBit}/>
          </div>
          <div className = "mid">
              <div>
                <span>Description</span>
                <input
                  type="text"
                  value={version.Description}
                  name="Description"
                  onChange={setField}
                />
              </div>
              <div>
                <span>Min Age</span>
                <input
                  type="text"
                  value={version.MinAge}
                  name="MinAge"
                  onChange={setField}
                />
              </div>
              <div>
                <label>
                <input
                    type="checkbox"
                    checked={version.IsActive}
                    name="IsActive"
                    onChange={setOption}
                />
                        Is Active
                </label>
              </div>
              <div>
                <label>
                <input
                    type="checkbox"
                    checked={version.StaffSubsidy}
                    name="StaffSubsidy"
                    onChange={setOption}
                />
                       Staff Subsidy
                </label>
              </div>
          </div>
    </TabPanel>
    <TabPanel>
      {options && productCodes && 
            <ListDragAndDrop 
                options = {options} 
                selected = {productLines?.map(x=>x.ProductCodeId)} 
                onChange = {onProductLinesChange}
                onClick = {onProductLinesClick}/>}
    </TabPanel>
  </Tabs>}
         
        </Container>
    );
}

export default VersionDetail;
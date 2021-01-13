import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import _ from 'lodash'; 
import ProductEdit from "./productEdit";
import versionDetail from "./VersionDetail";
import FeatureEdit from "./featureEdit";
import * as workFlowSrv from "../Service/WorkFlowService";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`
export const WorkFlow = styled.div`
    display: flex;
    flex-direction: column;
`

export const WorkFlowAction = styled.div`
    display: flex;
    flex-direction: row;
`
const WorkFlowDetail = () => {
    const [workFlowItem, setWorkFlowItem] = useState(null);
    const [originalWorkFlowItem, setOriginalWorkFlowItem] = useState(null);
    const [isDirtyWorkFlowItem, setIsDirtworkFlowItem] = useState(false);
    const [isDirtyObject, setIsDirtyObject] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const { Id } = useParams();

    const Components = {
        "ProductSuiteDto" : ProductEdit ,
        "ProductVersionDto" : versionDetail,
        "FeatureDto" : FeatureEdit
      };

    useEffect( () => {
        LoadWorkFlowItem()
       }, []);

       useEffect( () => {
        workFlowItem && setIsApproved(workFlowItem.ApprovalStatus === 4 ? true : false);
        handleIsDirtyWFI()
       }, [workFlowItem]);

       useEffect( () => {
        handleIsDirtyWFI()
       }, [originalWorkFlowItem]);

       const handleIsDirtyWFI = () =>{
        let isDirtworkFlowItem = !_.isEqual(workFlowItem, originalWorkFlowItem);
        let isDirtObject = !_.isEqual(workFlowItem?.Obj, originalWorkFlowItem?.Obj);
      
        setIsDirtworkFlowItem(isDirtworkFlowItem);
        setIsDirtyObject(isDirtObject);
      }

    const LoadWorkFlowItem = async() => {
        let wFI = await workFlowSrv.getItem(Id);

        console.log(wFI);
        console.log(wFI.Type);
        setWorkFlowItem(wFI);
        setOriginalWorkFlowItem(wFI);
       }

       const onObjSave = async(suite) => {
           let wFI = _.cloneDeep(workFlowItem);
           wFI.Obj = suite;

      //  let i = await workFlowSrv.SaveItem(wFI);
        setWorkFlowItem(wFI);
        //setOriginalWorkFlowItem(wFI);
        console.log(wFI);
       }

       const updateStatus = (status) => {
        let wFI = _.cloneDeep(workFlowItem);
        wFI.ApprovalStatus = status;

   //  let i = await workFlowSrv.SaveItem(wFI);
     setWorkFlowItem(wFI);
    // setOriginalWorkFlowItem(wFI);
     console.log(wFI);
       }

       const Amend = async() => {
        let wFI = await workFlowSrv.SaveItem(workFlowItem);
        setWorkFlowItem(wFI);
        setOriginalWorkFlowItem(wFI);
        console.log(wFI);
       }

       const Save = async() => {
        let wFI = await workFlowSrv.SaveItem(workFlowItem);
        setWorkFlowItem(wFI);
        setOriginalWorkFlowItem(wFI);
        console.log(wFI);
       }

       const ComponentForObject = workFlowItem && Components[workFlowItem.Type];

    return (
        <React.Fragment> 
          <Container>
              
              <WorkFlow>
    <h1>WorkFlow - {workFlowItem?.Id} - {workFlowItem?.ApprovalStatus}</h1>
                <WorkFlowAction>
                {!isDirtyObject && !isApproved && 
                <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    updateStatus("Approved");
                  }}
                  >
                  Approved
                </AwesomeButton>}
                {!isDirtyObject && !isApproved && 
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                      updateStatus("Rejected");
                    }}
                    >
                    Rejected
                  </AwesomeButton>}
                {isDirtyObject && !isApproved && 
                <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Amend();
                  }}
                  >
                  Amend
                </AwesomeButton>}
                {!isDirtyObject && isDirtyWorkFlowItem && !isApproved &&
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                    Save();
                    }}
                    >
                    Save
                </AwesomeButton>}
                </WorkFlowAction>
              </WorkFlow>
              {workFlowItem && 
                <ComponentForObject selected = {workFlowItem.Obj} onSave = {onObjSave}/>}  
              </Container>
              </React.Fragment>
    );
}

export default WorkFlowDetail;

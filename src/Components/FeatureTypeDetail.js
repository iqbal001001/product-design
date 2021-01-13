import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import _ from 'lodash'; 

import { AwesomeButton } from "react-awesome-button";
import { FeatureService } from "../Service/FeatureService";


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

export const InputBlockStyle = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;
`

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const FeatureTypeDetail = ({selectedType, onSave}) => {
  const featureSrv = new FeatureService();
  const [type, setType] = useState(selectedType ?? featureSrv.getNewType());

  useEffect( () => {
    selectedType && setType(selectedType);
   },[selectedType]);

   const Save =  async() => {
    console.log(type)
    let Id = await featureSrv.SaveType(type);
    console.log(Id);
    if (Id && Id > 0) {
        let i = {...type, Id};
        setType(i);
        onSave(i);
    }
  }

  const updateName = (e) => {
    setType({...type, Name:e});
    console.log(e);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Feature Type</h1>
        <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Save();
                  }}
                  >
                  {type.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>
        <div className = "header">
          
        </div>
        <div className = "mid">
          <InputBlock>
              <span>Name</span>
              <input
                type="text"
                value={type.Name}
                onChange={e => updateName(e.target.value)}
              />
            </InputBlock>
         
            
         </div>
      </Container>
    </React.Fragment>
  );
};

export default FeatureTypeDetail;


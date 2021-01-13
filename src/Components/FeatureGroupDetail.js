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


const FeatureGroupDetail = ({selectedCategory, onSave}) => {
  const featureSrv = new FeatureService();
  const [group, setGroup] = useState(selectedCategory ?? featureSrv.getNewGroup());

  useEffect( () => {
    selectedCategory && setGroup(selectedCategory);
   },[selectedCategory]);

   const SaveCategory =  async() => {
    console.log(group)
    let Id = await featureSrv.SaveGroup(group);
    console.log(Id);
    if (Id && Id > 0) {
        let i = {...group, Id};
        setGroup(i);
        onSave(i);
    }
  }

  const updateName = (e) => {
    setGroup({...group, Name:e});
    console.log(e);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Item Edit</h1>
        <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveCategory();
                  }}
                  >
                  {group.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>
        <div className = "header">
          
        </div>
        <div className = "mid">
          <InputBlock>
              <span>Code</span>
              <input
                type="text"
                value={group.Name}
                onChange={e => updateName(e.target.value)}
              />
            </InputBlock>
         
            
         </div>
      </Container>
    </React.Fragment>
  );
};

export default FeatureGroupDetail;


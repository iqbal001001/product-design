import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    .checkboxs {
        display: flex;
        flex-direction: column;
    }
`

const CheckBoxes = ({items, selectedItems}) => {
    
    let selectedCheckboxes = new Set();
  
    useEffect( () => {
      selectedCheckboxes.clear();
      selectedItems.map((item) => {
        return selectedCheckboxes.add(item);
      })
     }, [selectedItems]);
   
    
     const toggleCheckbox = (label) => {
      if (selectedCheckboxes.has(label)) {
        selectedCheckboxes.delete(label);
      } else {
        selectedCheckboxes.add(label);
      }
    }
     
  
    const createCheckbox = (label) => (
      <Checkbox
              label={label}
              handleCheckboxChange={() => toggleCheckbox(label)}
              key={label}
          />
    )
    const createCheckboxes = () => (
      items.map((item) => {return createCheckbox(item)})
    )
  
    return (
        <React.Fragment> 
            <Container> 
                <div className = "checkboxs">
                    {createCheckboxes()}
                </div>
            </Container>
        </React.Fragment> 
    );
  };
  
  export default CheckBoxes;
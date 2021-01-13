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

const BitCheckBoxes = ({name, items, value, onChange}) => {
  const [bitValue, setBitValue] = useState(false);

  useEffect(() => {
      console.log(value);
      setBitValue(value);
  }, [value]);

     const toggleCheckbox = (prop, checked) => {
      console.log(checked);
      if (checked){
        let b = bitValue | items[prop]
        console.log(b);
        setBitValue(b);
        onChange({name, value: b}); 
      }else{
        let b = bitValue ^ items[prop]
        console.log(b);
        setBitValue(b);
        onChange({name, value: b}); 
      }
      
    }
     
  
    const createCheckbox = (label) => (
          <label>
                <input
                    type="checkbox"
                    checked={bitValue  & items[label]}
                    onChange={e => toggleCheckbox(label, e.target.checked)}
                />
                        {label}
          </label>
    )
    const createCheckboxes = () => (
      Object.keys(items).filter((i) => {return i !== "None" }).map((item) => {return createCheckbox(item)})
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
  
  export default BitCheckBoxes;
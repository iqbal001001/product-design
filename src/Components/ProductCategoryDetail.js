import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import _ from 'lodash'; 

import { AwesomeButton } from "react-awesome-button";
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

export const InputBlockStyle = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;
`

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const ProductCategoryDetail = ({selectedCategory, onSave}) => {
  const productSrv = new ProductService();

  const [category, setCategory] = useState(selectedCategory ?? productSrv.getNewCategory());

  useEffect( () => {
    selectedCategory && setCategory(selectedCategory);
   },[selectedCategory]);

   const SaveCategory =  async() => {
    console.log(category)
    let Id = await productSrv.SaveCategory(category);
    console.log(Id);
    if (Id && Id > 0) {
        let i = {...category, Id};
        setCategory(i);
        onSave(i);
    }
  }

  const updateName = (e) => {
    setCategory({...category, Name:e});
    console.log(e);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Product Category Edit</h1>
        <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveCategory();
                  }}
                  >
                  {category.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>
        <div className = "header">
          
        </div>
        <div className = "mid">
          <InputBlock>
              <span>Name</span>
              <input
                type="text"
                value={category.Name}
                onChange={e => updateName(e.target.value)}
              />
            </InputBlock>
         
            
         </div>
      </Container>
    </React.Fragment>
  );
};

export default ProductCategoryDetail;


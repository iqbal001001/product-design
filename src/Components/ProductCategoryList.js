import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { ProductService } from "../Service/ProductService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

import ProductCategoryDetail from "./ProductCategoryDetail";
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";

export const ListStyle = styled.div`

`
const ProductCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productSrv = new ProductService();
  useEffect( () => {
   load()
  }, []);

const load = async() => {
 let items = await productSrv.getProductCategories()
 console.log(items);
 setCategories(items);
}

const modalRefCloneCategory = React.useRef();

const openModalCloneCategory = () => {
  modalRefCloneCategory.current && modalRefCloneCategory.current.openModal()
  //  GetAllTemplate();
};

const closeModalCloneCategory = () => {
  modalRefCloneCategory.current && modalRefCloneCategory.current.close()
};

const modalRefNewCategory = React.useRef();

const openModalNewCategory = () => {
  modalRefNewCategory.current && modalRefNewCategory.current.openModal()
  //  GetAllTemplate();
};

const closeModalNewCategory = () => {
  modalRefNewCategory.current && modalRefNewCategory.current.close()
};

const COLUMN_WIDTH = 200;

const columns = [
  {
    key: "Id",
    name: "Id",
    frozen: true,
    width: 40
  },
  {
    key: "Name",
    name: "Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "Action",
    name: "Action",
    frozen: true,
    width: 40
  }
];

function getCellActions(column, row) {
  const cellActions = {
    Action:  [
      {
        icon: <span><button>{icons.arrowE}</button></span>,
        callback: () => {
          setSelectedCategory(categories.find( ({ Id }) => Id === row.Id));
        }
      }
    ]
  };
  return cellActions[column.key];
}
   

  const onCategorySave = (category) => {
     let i = [...categories];
    let index = i.findIndex( ({ Id }) => Id === category.Id);
    if (index > -1){
      i[index] = category;
    }else
    {
      i.push(category);
    }
    setCategories(i);
    closeModalNewCategory();
    closeModalCloneCategory();
   }
  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Product Category List</h1>
          
            <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalNewCategory();
                  }}
                  >
                  New
              </AwesomeButton>
              <Modal ref={modalRefNewCategory}>
                    <h1>Create New</h1>
                    <ProductCategoryDetail onSave = {onCategorySave}/>
                     <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalNewCategory();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal> 
                {selectedCategory && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneCategory();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{selectedCategory && 
              <Modal ref={modalRefCloneCategory}>
                    <h1>Create Clone</h1>
                    <ProductCategoryDetail selectedCategory = {{...selectedCategory, Id : 0}} onSave = {onCategorySave}/> 
                     <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalCloneCategory();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>
              }
            <ReactDataGrid
                columns={columns}
                rowGetter={i => categories[i]}
                rowsCount={categories.length}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </ListStyle>
        {selectedCategory && <ProductCategoryDetail selectedCategory = {selectedCategory} onSave = {onCategorySave}/>}
    </React.Fragment>
  );
};

export default ProductCategoryList;


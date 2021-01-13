import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { ProductService } from "../Service/ProductService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

import ProductCodeDetail from "./ProductCodeDetail";
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";

export const ListStyle = styled.div`

`
const ProductCodeList = () => {
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const productSrv = new ProductService();
  useEffect( () => {
   load()
  }, []);

const load = async() => {
 let items = await productSrv.getProductCodes()
 console.log(items);
 setCodes(items);
}

const modalRefCloneCode = React.useRef();

const openModalCloneCode = () => {
  modalRefCloneCode.current && modalRefCloneCode.current.openModal()
  //  GetAllTemplate();
};

const closeModalCloneCode = () => {
  modalRefCloneCode.current && modalRefCloneCode.current.close()
};

const modalRefNewCode = React.useRef();

const openModalNewCode = () => {
  modalRefNewCode.current && modalRefNewCode.current.openModal()
  //  GetAllTemplate();
};

const closeModalNewCode = () => {
  modalRefNewCode.current && modalRefNewCode.current.close()
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
    key: "Code",
    name: "Code",
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
          setSelectedCode(codes.find( ({ Id }) => Id === row.Id));
        }
      }
    ]
  };
  return cellActions[column.key];
}
   

  const onCodeSave = (code) => {
     let i = [...codes];
    let index = i.findIndex( ({ Id }) => Id === code.Id);
    if (index > -1){
      i[index] = code;
    }else
    {
      i.push(code);
    }
    setCodes(i);
    closeModalNewCode();
    closeModalCloneCode();
   }
  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Product code List</h1>
          
            <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalNewCode();
                  }}
                  >
                  New
              </AwesomeButton>
              <Modal ref={modalRefNewCode}>
                    <h1>Create New Item</h1>
                    <ProductCodeDetail mode = "New" onSave = {onCodeSave}/>
                     <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalNewCode();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal> 
                {selectedCode && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneCode();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{selectedCode && 
              <Modal ref={modalRefCloneCode}>
                    <h1>Create Clone Item</h1>
                    <ProductCodeDetail  mode = "Clone" selectedCode = {{...selectedCode}} onSave = {onCodeSave}/> 
                     <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalCloneCode();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>
              }
            <ReactDataGrid
                columns={columns}
                rowGetter={i => codes[i]}
                rowsCount={codes.length}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </ListStyle>
        {selectedCode && <ProductCodeDetail selectedCode = {selectedCode} onSave = {onCodeSave}/>}
    </React.Fragment>
  );
};

export default ProductCodeList;


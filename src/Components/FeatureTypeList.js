import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { FeatureService } from "../Service/FeatureService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

import FeatureTypeDetail from "./FeatureTypeDetail";
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";

export const ListStyle = styled.div`

`
const FeatureTypeList = () => {
  const featureSrv = new FeatureService();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect( () => {
   load()
  }, []);

const load = async() => {
 let items = await featureSrv.getTypes()
 console.log(items);
 setTypes(items);
}

const modalRefCloneCategory = React.useRef();

const openModalCloneCategory = () => {
    modalRefCloneCategory.current.openModal()
  //  GetAllTemplate();
};

const closeModalCloneCategory = () => {
    modalRefCloneCategory.current.close()
};

const modalRefNewCategory = React.useRef();

const openModalNewCategory = () => {
    modalRefNewCategory.current.openModal()
  //  GetAllTemplate();
};

const closeModalNewCategory = () => {
    modalRefNewCategory.current.close()
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
    width: 80
  }
];

function getCellActions(column, row) {
  const cellActions = {
    Action:  [
      {
        icon: <span><button>{icons.cross}</button></span>,
        callback: () => {
            removeSelectedType(row.Id);
        }
      },
      {
        icon: <span><button>{icons.arrowE}</button></span>,
        callback: () => {
            setSelectedType(types.find( ({ Id }) => Id === row.Id));
        }
      }
    ]
  };
  return cellActions[column.key];
}
   

  const onSave = (type) => {
     let i = [...types];
    let index = i.findIndex( ({ Id }) => Id === type.Id);
    if (index > -1){
      i[index] = type;
    }else
    {
      i.push(type);
    }
    setTypes(i);
    modalRefNewCategory.current && closeModalNewCategory();
    modalRefCloneCategory.current && closeModalCloneCategory();
   }

   const removeSelectedType = async(id) => {
    let i = [...types];
    let index = i.findIndex( ({ Id }) => Id === id);
    if (index > -1) {
      await featureSrv.DeleteType(id);
      i.splice(index,1);
      setTypes(i);
    }
   }

  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Feature Type List</h1>
          
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
                    <h1>Create New Item</h1>
                    <FeatureTypeDetail onSave = {onSave}/>
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
                {selectedType && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneCategory();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{selectedType && 
              <Modal ref={modalRefCloneCategory}>
                    <h1>Create Clone Item</h1>
                    <FeatureTypeDetail selectedType = {{...selectedType, Id : 0}} onSave = {onSave}/> 
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
                rowGetter={i => types[i]}
                rowsCount={types.length}
                minHeight={200}
                getCellActions={getCellActions}
            />
        </ListStyle>
        {selectedType && <FeatureTypeDetail selectedType = {selectedType} onSave = {onSave}/>}
    </React.Fragment>
  );
};

export default FeatureTypeList;


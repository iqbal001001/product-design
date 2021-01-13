import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateItem } from "../Store/Item/item";
import { updateOriginalItem } from "../Store/Item/originalItem";
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { ItemService } from "../Service/ItemService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

import ItemDetail from "./ItemDetail";
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";

export const ListStyle = styled.div`

`
const ItemList = () => {
  const dispatch = useDispatch();
  const itemSrv = new ItemService();
  const [items, setItems] = useState([]);
 // const [selectedItem, setSelectedItem] = useState(null);
  const selectedItem = useSelector(state => state.entities.item);

  useEffect( () => {
   loadSuites()
  }, []);

  useEffect( () => {
    selectedItem && onItemSave(selectedItem)
   }, [selectedItem]);
   
const loadSuites = async() => {
 let items = await itemSrv.getItems()
 console.log(items);
 setItems(items);
}

const modalRefCloneItem = React.useRef();

const openModalCloneItem = () => {
  dispatch(updateItem({...selectedItem, Id : 0}));
  modalRefCloneItem.current.openModal()
  //  GetAllTemplate();
};

const closeModalCloneItem = () => {
  modalRefCloneItem.current.close()
};

const modalRefNewItem = React.useRef();

const openModalNewItem = () => {
  dispatch(updateItem(itemSrv.getNewItem()));
  modalRefNewItem.current.openModal()
};

const closeModalNewItem = () => {
  modalRefNewItem.current.close()
};

const COLUMN_WIDTH = 80;

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
    key: "Type",
    name: "Type",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "SpecialityCode",
    name: "SpecialityCode",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "ProviderNumber",
    name: "ProviderNumber",
    frozen: true,
    width: 140
  },
  {
    key: "StartDate",
    name: "StartDate",
    frozen: true,
    width: 120
  },
  {
    key: "EndDate",
    name: "EndDate",
    frozen: true,
    width: 120
  },
  {
    key: "Action",
    name: "Action",
    frozen: true,
    width: 80
  }
];

// const nameActions = [
//   {
//     icon: <span><button>{icons.arrowE}</button></span>,
//     callback: () => {
//       alert("Deleting");
//     }
//   }
// ];
function getCellActions(column, row) {
  const cellActions = {
    Action:  [
      {
        icon: <span><button>{icons.arrowE}</button></span>,
        callback: () => {
          let i = items.find( ({ Id }) => Id === row.Id);
          dispatch(updateItem(i));
         // dispatch(updateOriginalItem(i));
        }
      }
    ]
  };
  return cellActions[column.key];
}
  
  const onItemSave = (item) => {
     let i = [...items];
     if(item.Id !== 0){
      let index = i.findIndex( ({ Id }) => Id === item.Id);
      if (index > -1){
        i[index] = item;
      }else
      {
        i.push(item);
      }
      setItems(i);
    }
  }
  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Item List</h1>
          
            <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalNewItem();
                  }}
                  >
                  New
              </AwesomeButton>
              <Modal ref={modalRefNewItem}>
                    <h1>Create New Item</h1>
                    <ItemDetail />
                     <AwesomeButton
                    type="primary"
                    ripple

                    onPress={() => {
                        closeModalNewItem();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>  
                {selectedItem.Id > 0 && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneItem();
                  }}
                  >
                  Clone
              </AwesomeButton>}
              <Modal ref={modalRefCloneItem}>
                    <h1>Create Clone Item</h1>
                    <ItemDetail  /> 
                     <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalCloneItem();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => items[i]}
                rowsCount={items.length}
                minHeight={400}
                getCellActions={getCellActions}
            />
        </ListStyle>
        {selectedItem && <ItemDetail />}
    </React.Fragment>
  );
};

export default ItemList;


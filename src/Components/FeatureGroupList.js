import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { FeatureService } from "../Service/FeatureService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

import FeatureGroupDetail from "./FeatureGroupDetail";
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";

export const ListStyle = styled.div`

`
const FeatureGroupList = () => {
  const featureSrv = new FeatureService();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect( () => {
   load()
  }, []);

const load = async() => {
 let items = await featureSrv.getGroups()
 console.log(items);
 setGroups(items);
}

const modalRefCloneCategory = React.useRef();

const openModalCloneCategory = () => {
    modalRefCloneCategory.current.openModal()
  //  GetAllTemplate();
};

const closeModalCloneCategory = () => {
  modalRefCloneCategory.current && modalRefCloneCategory.current.close()
};

const modalRefNewCategory = React.useRef();

const openModalNewCategory = () => {
    modalRefNewCategory.current.openModal()
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
    width: 80
  }
];

function getCellActions(column, row) {
  const cellActions = {
    Action:  [
      {
        icon: <span><button>{icons.cross}</button></span>,
        callback: () => {
            removeSelectedGroup(row.Id);
        }
      },
      {
        icon: <span><button>{icons.arrowE}</button></span>,
        callback: () => {
          setSelectedGroup(groups.find( ({ Id }) => Id === row.Id));
        }
      }
    ]
  };
  return cellActions[column.key];
}
   

  const onSave = (group) => {
     let i = [...groups];
    let index = i.findIndex( ({ Id }) => Id === group.Id);
    if (index > -1){
      i[index] = group;
    }else
    {
      i.push(group);
    }
    setGroups(i);
    closeModalNewCategory();
    closeModalCloneCategory();
   }

   const removeSelectedGroup = async(id) => {
    let i = [...groups];
    let index = i.findIndex( ({ Id }) => Id === id);
    if (index > -1) {
      await featureSrv.DeleteGroup(id);
      i.splice(index,1);
      setGroups(i);
    }
   }
  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Feature Group List</h1>
          
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
                    <FeatureGroupDetail onSave = {onSave}/>
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
                {selectedGroup && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneCategory();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{selectedGroup && 
              <Modal ref={modalRefCloneCategory}>
                    <h1>Create Clone Item</h1>
                    <FeatureGroupDetail selectedCategory = {{...selectedGroup, Id : 0}} onSave = {onSave}/> 
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
                rowGetter={i => groups[i]}
                rowsCount={groups.length}
                minHeight={200}
                getCellActions={getCellActions}
            />
        </ListStyle>
        {selectedGroup && <FeatureGroupDetail selectedCategory = {selectedGroup} onSave = {onSave}/>}
    </React.Fragment>
  );
};

export default FeatureGroupList;


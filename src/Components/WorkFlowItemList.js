import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';
import * as workFlowSrv from "../Service/WorkFlowService";
import icons from 'glyphicons'


import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductListStyle = styled.div`

`

const COLUMN_WIDTH = 160;

const columns = [
  {
    key: "Id",
    name: "Id",
    frozen: true,
    width: 40
  },
  {
    key: "Type",
    name: "Type",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "API",
    name: "API",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "ApprovalStatus",
    name: "Status",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "Action",
    name: "Action",
    frozen: true,
    width: 20
  }
];

const WorkFlowItemList = () => {
  // const errorString = useSelector(state =>state.errorString);
  const [workFlowItems, setWorkFlowItems] = useState([]);

  useEffect( () => {
   loadSuites()
  }, []);

const loadSuites = async() => {
 let wFItems = await workFlowSrv.getItems()
 console.log(wFItems);
 setWorkFlowItems(wFItems);
}

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
        icon: <span> <Link className="link" to={"/WorkFlowDetail/" + row.Id}><button>{icons.arrowE}</button></Link></span>//,
        // callback: () => {
        //   let id = row.Id;
        //   return(<Redirect to="/productEdit/"{id} />);
        // }
      }
    ]
  };
  return cellActions[column.key];
}


   
  return (
    <React.Fragment> 
        <ProductListStyle>
            <h1>WorkFlow Item List</h1> 
            <ReactDataGrid
                columns={columns}
                rowGetter={i => workFlowItems[i]}
                rowsCount={workFlowItems.length}
                minHeight={200}
                getCellActions={getCellActions}
            />
        </ProductListStyle>
    </React.Fragment>
  );
};

export default WorkFlowItemList;


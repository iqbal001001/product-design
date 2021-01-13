import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { ClinicalCategoryService } from "../Service/ClinicalCategory";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

export const ListStyle = styled.div`

`

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



const ClinicalCategotyList = () => {
  const clinicalCategorySrv = new ClinicalCategoryService();
   const [clinicalCategories, setClinicalCategories] = useState([]);
 
   useEffect( () => {
    loadSuites()
   }, []);

const loadSuites = async() => {
  let ccs = await clinicalCategorySrv.getClinicalCategories()
  console.log(ccs);
  setClinicalCategories(ccs);
}
   
const removeSelectedClinicalCategory = async(id) => {
  let i = [...clinicalCategories];
  let index = i.findIndex( ({ Id }) => Id === id);
  if (index > -1) {
    await clinicalCategorySrv.DeleteClinicalCategory(id);
    i.splice(index,1);
    setClinicalCategories(i);
  }
}

function getCellActions(column, row) {
  const cellActions = {
    Action:  [
      {
        icon: <span><button>{icons.cross}</button></span>,
        callback: () => {
          removeSelectedClinicalCategory(row.Id);
        }
      },
      {
        icon: <span> <Link className="link" to={"/clinicalCategoryEdit/" + row.Id}><button>{icons.arrowE}</button></Link></span>
      }
    ]
  };
  return cellActions[column.key];
}
  return (
    <React.Fragment> 
        <ListStyle>
            <h1>ClinicalCategotyList List</h1>
            <Link className="link" to="/clinicalCategoryEdit/new">
                    <h3>New</h3>
                </Link>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => clinicalCategories[i]}
                rowsCount={clinicalCategories.length}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </ListStyle>
    </React.Fragment>
  );
};

export default ClinicalCategotyList;


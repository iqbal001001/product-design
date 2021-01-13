import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';

import { FeatureService } from "../Service/FeatureService";
import icons from 'glyphicons'

import 'bootstrap/dist/css/bootstrap.min.css';

export const ListStyle = styled.div`

`

const COLUMN_WIDTH = 440;

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

  function getCellActions(column, row) {
    const cellActions = {
      Action:  [
        {
          icon: <span><button>{icons.cross}</button></span>,
          callback: () => {
            removeSelectedFeature(row.Id);
          }
        },
        {
          icon: <span> <Link className="link" to={"/featureEdit/" + row.Id}><button>{icons.arrowE}</button></Link></span>//,
          // callback: () => {
          //   alert("Deleting " + row.Id);
          // }
        }
      ]
    };
    return cellActions[column.key];
  }
  const featureSrv =  new FeatureService();
   // const errorString = useSelector(state =>state.errorString);
   const [features, setFeatures] = useState([]);
 
   useEffect( () => {
    loadSuites()
   }, []);

const loadSuites = async() => {
  let features = await featureSrv.getFeatures()
  console.log(features);
  setFeatures(features);
}
   
const removeSelectedFeature = async(id) => {
  let i = [...features];
  let index = i.findIndex( ({ Id }) => Id === id);
  if (index > -1) {
    await featureSrv.DeleteFeature(id);
    i.splice(index,1);
    setFeatures(i);
  }
}

  return (
    <React.Fragment> 
        <ListStyle>
            <h1>Feature List</h1>
             <Link className="link" to="/featureEdit/new">
                    <h3>New</h3>
                </Link>
            <Link className="link" to="/featureGrouplist">
                    <h3>Group</h3>
                </Link>
                <Link className="link" to="/featureTypelist">
                    <h3>Type</h3>
                </Link>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => features[i]}
                rowsCount={features.length}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </ListStyle>
    </React.Fragment>
  );
};

export default ClinicalCategotyList;


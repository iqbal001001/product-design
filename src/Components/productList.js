import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash'; 
import ReactDataGrid from 'react-data-grid';
import { ProductService } from "../Service/ProductService";
import icons from 'glyphicons'


import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductListStyle = styled.div`

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
  }
];

const ProductList = () => {
  // const errorString = useSelector(state =>state.errorString);
  const [products, setProducts] = useState([]);
  
  const productSrv = new ProductService();

  useEffect( () => {
   loadSuites()
  }, []);

const loadSuites = async() => {
 let suites = await productSrv.getSuites()
 console.log(suites);
setProducts(suites);
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
    Name:  [
      {
        icon: <span> <Link className="link" to={"/productEdit/" + row.Id}><button>{icons.arrowE}</button></Link></span>//,
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
            <h1>Product List</h1> 
            <Link className="link" to="/productEdit/new">
                    <h3>New</h3>
                </Link>
            <Link className="link" to="/productCategorylist">
                    <h3>Category</h3>
                </Link>
                <Link className="link" to="/productCodelist">
                    <h2>Code</h2>
                </Link>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => products[i]}
                rowsCount={products.length}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </ProductListStyle>
    </React.Fragment>
  );
};

export default ProductList;


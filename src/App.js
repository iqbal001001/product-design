import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './Components/NavBar';
import ErrorSection from './Components/ErrorSection';
import ProductList from './Components/productList';
import ProductEditContainer from './Components/ProductEditContainer';
import WorkFlowDetail from './Components/WorkFlowDetail';
import productCategoryList from './Components/ProductCategoryList';
import productCodeList from './Components/ProductCodeList';
import FeatureList from './Components/featureList';
import FeatureEditContainer from './Components/featureEditContainer';
import featureGroupList from './Components/FeatureGroupList';
import featureTypeList from './Components/FeatureTypeList';
import ClinicalCategoryList from './Components/ClinicalCategoryList';
import ClinicalCategoryData from './Components/ClinicalCategoryData';
import ItemList from './Components/ItemList';
import WorkFlowItemList from './Components/WorkFlowItemList';


function App() {
  return (
    <React.Fragment> 
      <Router>
        <NavBar></NavBar>
        <ErrorSection/>
        <Switch>
            <Route path="/" exact component={ProductList}/>
            <Route path="/productlist" exact component={ProductList}/>
            <Route path="/productedit/:Id" exact component={ProductEditContainer}/>
            <Route path="/WorkFlowDetail/:Id" exact component={WorkFlowDetail}/>
            <Route path="/productCategoryList" exact component={productCategoryList}/>
            <Route path="/productCodeList" exact component={productCodeList}/>
            <Route path="/featurelist" exact component={FeatureList}/>
            <Route path="/featureedit/:Id" exact component={FeatureEditContainer}/>
            <Route path="/featureGroupList" exact component={featureGroupList}/>
            <Route path="/featureTypeList" exact component={featureTypeList}/>       
            <Route path="/ClinicalCategorylist" exact component={ClinicalCategoryList}/>
            <Route path="/ClinicalCategoryedit/:Id" exact component={ClinicalCategoryData}/>
            <Route path="/ItemList" exact component={ItemList}/>
            <Route path="/WorkFlowItemList" exact component={WorkFlowItemList}/>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;

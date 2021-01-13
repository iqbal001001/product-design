import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import  reducer  from './reducer'
//import logger from './middleware/logger';
import productService from './MiddleWare/Product/productService';
import product from './MiddleWare/Product/product';
import featureService from './MiddleWare/Feature/featureService';
import feature from './MiddleWare/Feature/feature';
import itemService from './MiddleWare/Item/itemService';
import item from './MiddleWare/Item/item';
import cinicalCategoryService from './MiddleWare/ClinicalCategory/clinicalCategoryService';
import cinicalCategory from './MiddleWare/ClinicalCategory/clinicalCategory';
//import suite from './middleware/suite';
//import errorString from './middleware/error';
//import isDirty from './middleware/isDirty';

export default function() {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            productService,
             product,
             featureService,
             feature,
             itemService,
             item,
             cinicalCategoryService,
             cinicalCategory
            // errorString,
            // isDirty
            ]
    });
}
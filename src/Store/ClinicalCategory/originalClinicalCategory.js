import { createSlice } from '@reduxjs/toolkit'
import { ClinicalCategoryService } from '../../Service/ClinicalCategory';

const cCSrv = new ClinicalCategoryService();

const   originalClinicalCategorySlice = createSlice({
    name: 'originalClinicalCategory',
    initialState: cCSrv.getNewClinicalCategory(),
    reducers: {
      updateOriginalClinicalCategory(cc, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalClinicalCategory} = originalClinicalCategorySlice.actions
  export default originalClinicalCategorySlice.reducer
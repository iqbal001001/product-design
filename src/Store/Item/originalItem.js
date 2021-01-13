import { createSlice } from '@reduxjs/toolkit'
import { ItemService } from '../../Service/ItemService';

const itemSrv = new ItemService();

const   originalItemSlice = createSlice({
    name: 'originalItem',
    initialState: itemSrv.getNewItem(),
    reducers: {
      updateOriginalItem(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalItem } = originalItemSlice.actions
  export default originalItemSlice.reducer
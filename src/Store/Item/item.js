import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetItem, serviceSaveItem } from './service';
import { ItemService } from '../../Service/ItemService';

const itemSrv = new ItemService();

export const itemReceived = createAction("item/itemReceived");
export const itemSaved = createAction("item/itemSaved");

const  itemSlice = createSlice({
    name: 'item',
    initialState: itemSrv.getNewItem(),
    reducers: {
      updateItem(item, action){
        return action.payload; 
      },
    },
  })
  
  export const {
     updateItem } = itemSlice.actions
  export default itemSlice.reducer

 // Action Creators

  export const loadItem = (id) => serviceGetItem({
    data: id,
    onSuccess: itemReceived.type
  });


  export const SaveItem = (item) => serviceSaveItem({
    data: item,
    onSuccess: itemSaved.type
  });



  //createselector from reselect for cachng
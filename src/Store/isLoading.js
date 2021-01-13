import { createSlice } from '@reduxjs/toolkit'
//import { templateReceived } from './template'

const   isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading(loading, action){
            return action.payload;
          }, 
    },
    // extraReducers: {
    //     [templateReceived] : (state, action) => {
    //         return action.payload;
    //       }
    // }
  })
  
  export const { setIsLoading } = isLoadingSlice.actions
  export default isLoadingSlice.reducer
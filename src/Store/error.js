import { createSlice } from '@reduxjs/toolkit'

const   errorStringSlice = createSlice({
    name: 'errorString',
    initialState: "",
    reducers: {
      setErrorString(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { setErrorString } = errorStringSlice.actions
  export default errorStringSlice.reducer
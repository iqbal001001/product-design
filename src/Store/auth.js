import { createSlice } from '@reduxjs/toolkit'

const  authSlice = createSlice({
    name: 'auth',
    initialState: { },
    reducers: {
      updateAuth(template, action){
        template = action.payload
      },  
    },
  })
  
  export const { updateAuth } = authSlice.actions
  export default authSlice.reducer
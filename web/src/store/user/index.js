import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userRoute:[{
        path:'/',
        component:'Home',
        exact:true
    }]
}
export const userSlice = createSlice({
   name:'userState',
   initialState,
   reducers:{

   }
});
export default userSlice.reducer;
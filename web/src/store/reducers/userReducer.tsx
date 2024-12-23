import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlainRoute {
    path:string;
    component:string;
    exact:boolean;
}
interface UserState {
    userRoute: PlainRoute[];
}
const initialState: UserState = {
    userRoute:[{
        path:'/',
        component:'Home',
        exact:true
    }]
};
export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setPackagePeriod: (state, action: PayloadAction<{ index: number; periodIndex: number }>) => {
      
    },
  },
  extraReducers: (builder) => {
   
  }
});

export const {
  setPackagePeriod
} = userSlice.actions;

export default userSlice.reducer;
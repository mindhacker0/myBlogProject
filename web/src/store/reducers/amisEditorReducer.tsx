import URDFCustomManipulator from "@/urdf/URDFCustomManipulator";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AmisEditorState {
}
const initialState: AmisEditorState = {
};
export const amisEditorSlice = createSlice({
  name: "amisEditorState",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
  }
});

export const {} = amisEditorSlice.actions;

export default amisEditorSlice.reducer;
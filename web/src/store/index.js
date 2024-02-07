import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/user';
export const store = configureStore({
   reducer:{
      user:userReducer
   }
});
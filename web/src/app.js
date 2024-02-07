import React from 'react';
import { compose } from "redux";
import Route from "./router";
import AppStateHoc from './components/hoc/storeHoc';
// 组合hoc组件
const mainApp = ()=>{
   const ComposedApp = compose(AppStateHoc)(Route);
   return <ComposedApp />
};
export default mainApp;


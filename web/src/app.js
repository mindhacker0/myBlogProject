import React from 'react';
import { compose } from "redux";
import Route from "./router";
// 组合hoc组件
const mainApp = ()=>{
   const ComposedApp = compose()(Route);
   return <ComposedApp />
};
export default mainApp;


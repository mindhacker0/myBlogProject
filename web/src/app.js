import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { compose } from "redux";
import AppStateHoc from "./lib/state_hoc";
import ModalHoc from "./lib/modal_hoc";
import Route from "./router";
//attach HOCs to app
export default ()=>{
   const ComposedApp=compose(AppStateHoc,ModalHoc)(Route);
   return <ComposedApp />
}
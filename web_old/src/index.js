import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import ReactModal from "react-modal";
import 'antd/dist/antd.css';
ReactModal.setAppElement(document.getElementById('root'));
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

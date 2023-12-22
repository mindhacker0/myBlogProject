import React from 'react';
import '@/style/main.scss';
import {createRoot} from 'react-dom/client';
import App from '@/app.js';
// import ReactModal from "react-modal";
// ReactModal.setAppElement(document.getElementById('root'));
const root = createRoot(document.getElementById('root'));
root.render(<App />);
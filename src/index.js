import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import App from './App';


require('dotenv').config();

toast.configure();
ReactDOM.render(<App />, document.getElementById('root'));

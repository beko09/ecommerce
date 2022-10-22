import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { persister, store } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConfigProvider,message } from 'antd';

import "./index.css";



message.config({
  top: 100,
  duration: 7,
  maxCount: 3,
  rtl: true,
});


ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider direction="rtl" lang="ar" >
        <PersistGate loading={'loading...'} persistor={persister}>

          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </ConfigProvider>
    </Provider>
  ,
  document.getElementById('root')
);



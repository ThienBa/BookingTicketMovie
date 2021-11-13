import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import 'antd/dist/antd.css';
import './i18n';
// import { DOMAIN } from './utils/settings/config';

// //Config realtime with signalR
// import * as signalR from '@aspnet/signalr';

// // Paragraph connect to server listen from server
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

// connection.start().then(() => {
 
// }).catch(err => {
//   alert(err);
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

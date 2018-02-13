import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import HelloContainer from './containers/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <HelloContainer />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

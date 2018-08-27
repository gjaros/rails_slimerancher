import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import App from './components/App';
import reducers from './reducers/reducers';

const locations = [
  //docks
  [146, 738],
  [146, 820],
  [228, 820],
  [228, 738],
  //grotto
  [1126, 286],
  [1210, 244],
  [1275, 320],
  [1266, 397],
  [1152, 376],
  //lab
  [1000, 677],
  [1000, 759],
  [1082, 759],
  [1082, 677],
  [1135, 867],
  //overgrowth
  [318, 330],
  [403, 332],
  [416, 438],
  [270, 446],
  //ranch
  [804, 216],
  [804, 298],
  [886, 298],
  [886, 216],
  [680, 216],
  [680, 298],
  [804, 388],
  [886, 388],
  //ogden
  [470, 1000],
  [552, 1000],
  [552, 1080],
  [470, 1080],
  [630, 1108],
  [422, 1188],
  //mochi
  [1714, 858],
  [1714, 1050],
  [1635, 835],
  [1635, 1073],
  [1550, 1050]
]

let plots = [];

locations.forEach((plot) => {
  plots.push({
    hidden: true,
    location: plot,
    kind: 'default',
    plotProps: {},
    lists: [{ selected: 'Blank', modalIsOpen: false }]
  });
});

const store = createStore(reducers, plots, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#rancher_app')
);

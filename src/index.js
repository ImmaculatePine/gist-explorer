import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configure-store';
import Root from './containers/root';
import './styles/style.scss';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);

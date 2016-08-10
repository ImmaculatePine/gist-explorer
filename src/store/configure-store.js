import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(thunk);

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleware = applyMiddleware(thunk, logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}

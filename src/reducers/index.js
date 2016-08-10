import { combineReducers } from 'redux';
import auth from './auth';
import gists from './gists';
import labels from './labels';
import data from './data';

export default combineReducers({
  auth,
  gists,
  labels,
  data,
});

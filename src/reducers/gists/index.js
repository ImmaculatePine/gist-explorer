import { combineReducers } from 'redux'
import list from './list'
import single from './single'

export default combineReducers({
  list,
  single
})

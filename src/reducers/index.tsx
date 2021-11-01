import { combineReducers } from 'redux'
import auth from './auth_reducer'
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const config = {
  key: 'primary',
  storage
}

export default persistCombineReducers(config, {
  auth
})
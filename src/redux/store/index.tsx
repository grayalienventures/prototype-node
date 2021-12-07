import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducers from '../reducers'


const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['auth']
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(thunk),

  )
)

let persistor = persistStore(
  store,
  null, () => {
    store.getState() // if you want to get restoredState
  }
)
// store.subscribe(mapStoreToStorage);

// persistStore(store, { storage: AsyncStorage, whitelist: ['saves'] })

export default store
export { persistor, store }

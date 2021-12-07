import { combineReducers } from 'redux';

import auth, { AuthStateT } from './authReducer';


export interface IAppState {
  auth: AuthStateT
}
const reducers = combineReducers<IAppState>({
  // form:formreducer,
  auth,

});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
// export default reducers;

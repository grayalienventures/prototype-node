import {

    LOGIN_SUCCESS,
    LOG_OUT,
    UPDATE_INFO_ACCOUNT,
    UPDATE_USER_DATA,
    ActionT
} from '../actions/actionsType'
import config from '../../constants/config'
import { UserT, CoordinateT } from '../../types/Users'


export interface AuthStateT {
    userData: UserT;
    loading: boolean,
    token: string,
    refreshToken: string,
    successLogin?: boolean,
    socketToken?: string,
    isCheckAuth?: boolean,
    tokenExpires?: number,
    isRegister?: boolean
}
const authInit: AuthStateT = {
    loading: false,
    token: null,
    refreshToken: null,
    successLogin: false,
    userData: null,
    socketToken: null,
    isCheckAuth: false,
    tokenExpires: 0,

}

export function authReducer(state: AuthStateT = authInit, action: ActionT): AuthStateT {
    switch (action.type) {
        case LOGIN_SUCCESS:
            //localStorage.setItem('token', action.payload.token);

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                socketToken: action.payload.token,
                userData: action.payload.userData,
                tokenExpires: action.payload.tokenExpires,
                // user_meta: action.user_meta,
                // socket_token: action.socket_token ? action.socket_token : state.socket_token,
            };

        case LOG_OUT:
            // localStorage.removeItem('token');
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return {
                ...state,
                loading: false,
                token: null,
                userData: null,
                refreshToken: null,
                socketToken: null,
                tokenExpires: null,
            }

        case UPDATE_USER_DATA:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            }
        case UPDATE_INFO_ACCOUNT:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            }
        default:
            return state;
    }
}

export default authReducer;
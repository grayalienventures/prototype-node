import { Platform } from 'react-native';

import {
    LOGIN_SUCCESS,
    GET_ADDRESS_USER, LOG_OUT,
    UPDATE_USER_DATA,
} from './actionsType';

import config from '../../constants/config';
import { store } from '../store';
import { InstanceAxios } from '../../utils/RequestMethods';


/**
 * 
 * @param {response_success_login} data 
 */

export const actionLoginSuccess = (data) => {

    return {
        type: LOGIN_SUCCESS, payload: {
            userData: data.data,
            token: data.token,
            refreshToken: data.refresh_token,
            tokenExpires: data.exp,
        }
    }
}

/**
 * 
 * @param data 
 */
export const loginSuccess = (data) => async dispatch => {
    dispatch(actionLoginSuccess(data))
   
}

/**
 * 
 * @param {user_data} data 
 */
export const updateUserDataStore = (data) => async dispatch => {
    dispatch({ type: UPDATE_USER_DATA, payload: data, })
}

/**
 * 
 */
export const updateUserData = async () => {
    try {
        let data = await InstanceAxios.get(`${config.url.wpJson}/wp/v2/users/me`).then((res) => {
            if (res && res.data) {
                return res.data;

            }
        })

        if (data) {
            store.dispatch({ type: UPDATE_USER_DATA, payload: data, })

        }
    } catch (error) {
        console.warn("error->updateUserData", error)
    }
}


/**
 * 
 */
export const restLogOut = async () => {
    store.dispatch({ type: LOG_OUT })
}


/**
 * 
 * @param force 
 */
export const logOut = async (force = false) => {
    if (force) {
        store.dispatch({ type: LOG_OUT })
    }
    InstanceAxios.post(`${config.url.auth.revoke}`).then((res) => {
        if (res) {
            store.dispatch({ type: LOG_OUT })
        }
    }).catch((error) => {
        console.log("" + error);
    })

}




export const InitAuth = () => async dispatch => {
   
    const _store = store.getState();
    const auth = _store.auth;
  
    if (auth && auth.token && auth.userData) {
        let userData = auth.userData
        /**
         * asyncAccount
         */
        updateUserData()

        return true;
    } else {

    }

    return false;
}






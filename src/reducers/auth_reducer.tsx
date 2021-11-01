import {
    ATTEMPT,
    CLEAR_ERROR, CLEAN_AUTH,
    LOGIN_AUTH_ERROR,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOG_OUT,
} from '../actions/actionsType'
import config from '../constants/config'
const authInit = {
    loading: false,
    token: null,
    successLogin: false,
    userData: [],
    socket_token: null,
}

export default (state = {}, action) => {
    switch (action.type) {
        case ATTEMPT:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payLoad,
                userData: action.userData,
                successLogin: true
            }
        case LOGIN_AUTH_ERROR:
            return {
                ...state,
                loading: false,
                token: null,
                successLogin: false,
                socket_token: null,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                msg: action.msg,
                loading: false,
                token: null,
            }


        case LOG_OUT:
            return {
                ...state,
                loading: false,
                token: null,
                userData: [],
                socket_token: null,
                successLogin: false,

            }
        default:
            return state
    }
}


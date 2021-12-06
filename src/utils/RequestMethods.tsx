import * as React from 'react'
import axios from 'axios'
import wp from './wp'
import { logOut, updateUserData, actionLoginSuccess } from '../redux/actions/authActions';
import config from '../constants/config';
import _ from 'lodash'
import moment from "moment"
import { withQuery } from './index';
import { store } from '../redux/store';

export const InstanceAxios = axios.create({
    baseURL: config.url.wpJson,
})

enum RequestmMethods {
    GET, POST, DELETE, PATCH, PUT
}


// Add a request interceptor
InstanceAxios.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token")
    if (token && token != "") {
        config.headers = {
            ...config.headers, ...{
                'Authorization': `Bearer ${token}`
            }
        }
    }
    const methodReadAble = ['GET', 'get', 'DELETE', 'delete']
    if (methodReadAble.includes(config.method) && config.data && _.isObject(config.data)) {
        config.url = withQuery(config.url, config.data)
    }


    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

InstanceAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (axios.isCancel(error)) {
            return "axios request cancelled";

        }
        const originalRequest = error.config;
        let refresh_token = localStorage.getItem("refreshToken");
        if (refresh_token && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.setItem("refreshTokenIsLoading", "true");

            return fetchRefreshToken(refresh_token)
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        /**
                         * jwt token refreshed!
                         */
                        let newConfig = {
                            ...originalRequest, ...{
                                headers: { ...originalRequest.headers, ...{ 'Authorization': `Bearer ${res.data.token}` } },
                            }
                        }
                        localStorage.removeItem("refreshTokenIsLoading");
                        return axios(newConfig);
                    }
                }).catch((error) => {
                    localStorage.removeItem("refreshTokenIsLoading");
                    return Promise.reject(error);
                })
        }
        return Promise.reject(handleErrorResponse(error));

    }
);



/**
 * 
 * @param token 
 * @returns 
 */
const fetchRefreshToken = (token) => {
    const options = {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
        data: {},
        url: `${config.url.auth.refresh}`,
    };
    return axios(options).then((res) => {
        // console.log("refreshToken->", res)
        if (res && res.data) {
            const data = res.data
            store.dispatch(actionLoginSuccess(res.data))
            updateUserData()
        }
        return res;
    }).catch((error) => {
        if (error.response) {
            const regex = /^\b(rest_authentication_)/g;
            if ((error.response.status == 403 || error.response.status == 401) && error.response.data.code && regex.test(error.response.data.code)) {
                /**
                 * logout
                 */
                logOut()
            }
        }
        throw new Error(error)
    })

}

/**
 * handelErrorReponse
 * @param error 
 */
const handleErrorResponse = (error) => {
    if (error.response) {
        if (error.response.data && error.response.data.code && error.response.data.message) {
            const regex = /^[[][jwt_auth]+[\]]/g;
            if (regex.test(error.response.data.code)) {
                throw new Error(restMessageError(error.response.data.message));
            }
        }
        if (error.response.status == 403) {
            throw error;
        }
        if (error.response.data && error.response.data.message) {
            throw new Error(restMessageError(error.response.data.message));
        }

    } else if (error.request) {
        throw new Error("The request was made but no response was received");

    } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
    }
}

/**
 * remove <Tags></Tangs> 
 * @param message 
 */
const restMessageError = (message: string = ""): string => {
    const regexRemoveTags = /(<([^>]+)>)/ig;
    message = message.replace(regexRemoveTags, '')
    // message = message.replace(/\b(Error:)/g, '')
    return message
}


/**
 * 
 * @param {Blob} file 
 * @param {altText='',caption='',description=''} options 
 */
export const uploadFileServer = async (file, params = {}, options = { altText: '', caption: '', description: '' }) => {
    let token = localStorage.getItem("token")

    let _options = {
        altText: '',
        caption: '',
        description: '',
    }
    _options = { ..._options, ...options }
    try {
        let response = await wp.media()
            .setHeaders({
                Authorization: `Bearer ${token}`,
            })
            // Specify a path to the file you want to upload, or a Buffer
            .file(file)
            .create({
                title: file.name,
                alt_text: _options.altText,
                caption: _options.caption,
                description: options.description,
                ...params
            })
            .then(function (res) {
                // Your media is now uploaded: let's associate it with a post
                return res;
            })

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}



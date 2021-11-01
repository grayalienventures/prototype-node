import store from '../store'
import * as _  from 'lodash'

export const unauthorizedRequest = async (url, args, method = "POST") => {
  try {
    let formData = new FormData()

    Object.keys(args).map(key => {
      let val = args[key]
      if (key == "image") {
        formData.append(key, val)
      } else if (_.isArray(val) || _.isObject(val)) {
        formData.append(key, JSON.stringify(args[key]))
      } else {
        formData.append(key, args[key])
      }
    })

    let response = await fetch(
      url, {
        method: method,
        headers: {
          // 'Content-Type': 'multipart/form-data'
        },
        body: formData
      }
    )

    const text = await response.text()
    const responseJson = JSON.parse(text)
    return responseJson
  } catch (error) {
    throw new Error(error)
  }
}

export const authorizedRequest = async (url, args, method = "POST") => {
  try {
    let storee = store.getState()
    let param = {
      // @ts-ignore
      auth_token: storee.auth.token,
        // @ts-ignore
      user_id: storee.auth.user_data.ID
    }
    param = { ...param, ...args }
    let response = await unauthorizedRequest(url, param, method)
    return response
  } catch (error) {
    throw new Error(error)
  }
}
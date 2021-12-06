import moment from "moment"
export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const keyGenerator = () => (
    Math.random().toString(36).substr(2, 10)
)

export const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
}

// export const isObject = obj => {
//     return (typeof obj === "object" && obj !== null) || typeof obj === "function"
// }

export const isNumber = number => {
    try {
        return number.replace(/[^0-9\.]/g, '')
    } catch (error) {
        console.warn("number", number)
        console.warn("" + error)
    }
}

export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}


/**
 * withQuery 
 * @param {url} str 
 * @param {params} object json 
 */
export const withQuery = (url, params = {}) => {
    const esc = encodeURIComponent
    let query = Object.keys(params)
        .filter(key => params[key] !== '' && params[key] !== null)
        .map(key => `${esc(key)}=${esc(params[key])}`)
        .join('&')
    query = query.length > 0 ? `?${query}` : ''

    return `${url}${query}`
}



export const getTimezoneOffset = () => {
    const dateTimeUtc = moment.utc()
    let local = moment(dateTimeUtc).local()
    return local.utcOffset();
}


export const __pick = function (data, keys) {
    var obj = {};
    keys.forEach((key) => {
        obj[key] = data[key];
    });
    return obj;
};
import _ from 'lodash'


export const jsonDecode = str => {
    try {
        if (str != "") {
            return JSON.parse(str.replace(/\\\"/g, '"'))
        }
    } catch (error) {
        console.warn("jsonDecode" + error + " str: " + str)
    }
}

export const jsonDecodeArray = obj => {
    try {
        let _obj = _.isObject(obj) ? obj : jsonDecode(obj)
        if (_.isArray(_obj)) {
            return _obj
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

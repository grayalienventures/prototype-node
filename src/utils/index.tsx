export const keyGenerator = () => (
    Math.random().toString(36).substr(2, 10)
)

export const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
}

export const isObject = obj => {
    return (typeof obj === "object" && obj !== null) || typeof obj === "function"
}

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
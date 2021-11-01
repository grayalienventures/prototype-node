export default (...rules) => {
    return rules.filter(Boolean).reduce((result, rule) => {
        return { ...result, ...rule }
    }, {})
}
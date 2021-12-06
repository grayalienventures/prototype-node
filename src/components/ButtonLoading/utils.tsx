
export const styleRules=(...rules) => {
    return rules.filter(Boolean).reduce((result, rule) => {
        return { ...result, ...rule };
    }, {});
};
export const __pick = function (current, arr) {
    var obj = {};
    arr.forEach((key) => {
        obj[key] = current[key];
    });
    return obj;
};
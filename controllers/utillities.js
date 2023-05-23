

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

const isValid = function(value){
    if ( typeof value === 'undefined' || value === null ) return false
    if ( typeof value === 'string' && value.trim().length === 0 ) return false
    return true
}


const isValidTitle = function(title){
    return ['Mr', 'Mrs', 'Miss', 'Mast'].indexOf(title) !== -1
}

const isValidphone = function (value, type) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value != type) return false
    return true;
}






module.exports = { isValidRequestBody, isValid, isValidTitle, isValidphone }
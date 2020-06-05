var responseHelper = {};
responseHelper.Success = function(data = {}, message = "Success", status = 200) {
    return {
        status,
        message,
        data
    }
}
responseHelper.Fail = function(data = {}, message = "Failed", status = 500) {
    return {
        status,
        message,
        data
    }
}
responseHelper.Invalid = function(message = "Invalid request", data = {}, status = 503) {
    return {
        status,
        message,
        data
    }
}
responseHelper.UnAuthorized = function(message = "UnAuthorized", data = {}, status = 401) {
    return {
        status,
        message,
        data
    }
}
module.exports = responseHelper;
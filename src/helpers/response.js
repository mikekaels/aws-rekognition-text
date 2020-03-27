function success(res, data, statusCode, message = undefined) {
    const response = {
        success: true,
        message: message,
        data: data
    }
    if (data == null) delete response.data
    if (message == null) delete response.message

    return res.status(statusCode).json(response)
}

function error(res, err, statusCode, message = undefined) {
    const response = {
        success: false,
        message: message,
        error: err
    }
    if (err == null) delete response.error
    if (message == null) delete response.message
    return res.status(statusCode).json(response)
}

module.exports = {
    success,
    error
}
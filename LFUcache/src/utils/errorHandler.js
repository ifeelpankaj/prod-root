import logger from './logger.js'

export default (controller, err, req, errorStatusCode = 500) => {
    const errorObj = {
        success: false,
        statusCode: err.statusCode || errorStatusCode,
        request: {
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || 'Something went worng !' : 'Something went worng !',
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // Log
    logger.error(`${controller} CONTROLLER`, {
        meta: errorObj
    })

    return errorObj
}

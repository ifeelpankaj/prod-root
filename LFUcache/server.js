import logger from './src/utils/logger.js'
import app from './app.js'

const port = 2000
const server = app.listen(port)
logger.info('Hiii Working')
;(async () => {
    try {
        // Log application start
        logger.info('CACHING IS STARTED && WORKING FINE = TRUE', {
            meta: { PORT: port }
        })
    } catch (error) {
        // Log application error
        logger.error('SERVER IS STARTED && HEALTHY != TRUE', {
            meta: {
                message: error.message,
                stack: error.stack
            }
        })

        // Attempt to close the server
        server.close((closeError) => {
            if (closeError) {
                // Log server close error
                logger.error('APPLICATION_ERROR', {
                    meta: {
                        message: closeError.message,
                        stack: closeError.stack
                    }
                })
            }

            // Exit the process with failure status
            process.exit(1)
        })
    }
})()

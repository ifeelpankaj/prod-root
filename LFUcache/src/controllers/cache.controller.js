// const { default: CustomError } = require('../utils/customeError')
// const { default: httpResponse } = require('../utils/httpResponse')

// class Node {
//     constructor(key, value) {
//         this.key = key
//         this.value = value
//         this.freq = 1
//         this.prev = null
//         this.next = null
//         this.createdAt = Date.now()
//         this.lastAccessed = Date.now()
//     }
// }

// class CacheController {
//     constructor(options = {}) {
//         const { capacity = 50, onEvict = null, enableStats = true } = options

//         if (capacity <= 0) {
//             throw new CustomError('Cache capacity must be greater than 0', 405)
//         }

//         this.capacity = capacity
//         this.onEvict = onEvict
//         this.enableStats = enableStats

//         // Core cache data structures
//         this.minFreq = 0
//         this.size = 0
//         this.keyMap = new Map()
//         this.freqMap = new Map()

//         // Statistics
//         this.stats = {
//             hits: 0,
//             misses: 0,
//             sets: 0,
//             deletes: 0,
//             evictions: 0,
//             startTime: Date.now()
//         }

//         logger.info('LFU_CACHE_INITIALIZED', {
//             meta: {
//                 capacity,
//                 enableStats,
//                 timestamp: Date.now()
//             }
//         })
//     }

//     async get_data(req, res, next) {
//         try {
//             const { key } = req.params

//             this._validateKey(key)

//             if (!this.keyMap.has(key)) {
//                 this.enableStats && this.stats.misses++

//                 logger.info('CACHE_MISS', {
//                     meta: {
//                         key,
//                         operation: 'get_data',
//                         reason: 'key_not_found',
//                         timestamp: Date.now()
//                     }
//                 })

//                 return httpResponse(req, res, 404, 'Cache key not found', null)
//             }
//             //Here we have found data
//             const node = this.keyMap.get(key)

//             // Update access time and frequency as we found our data
//             node.lastAccessed = Date.now()
//             this._updateNodeFrequency(node)

//             this.enableStats && this.stats.hits++ // update in stats

//             logger.info('CACHE_HIT', {
//                 meta: {
//                     key,
//                     cached: true,
//                     operation: 'get_data',
//                     frequency: node.freq,
//                     lastAccessed: node.lastAccessed,
//                     timestamp: Date.now()
//                 }
//             })

//             return httpResponse(req, res, 200, 'Cache data retrieved successfully', node.value)
//         } catch (error) {
//             logger.error('LFU_CACHE_GET_ERROR', {
//                 meta: {
//                     key: req.params?.key,
//                     operation: 'get_data',
//                     error: error.message,
//                     stack: error.stack,
//                     timestamp: Date.now()
//                 }
//             })

//             return errorHandler('LFU_CACHE_CONTROLLER', next, error, req, 500)
//         }
//     }
//     async set_data(req, res, next) {
//         try {
//             const { value, key } = req.body

//             this._validateKey(key)
//             this._validateValue(value)

//             let isUpdate = false
//             let oldValue = null
//             let operation = 'created'

//             if (this.keyMap.has(key)) {
//                 // Update existing key
//                 const node = this.keyMap.get(key)
//                 oldValue = node.value

//                 node.value = value
//                 node.lastAccessed = Date.now()
//                 this._updateNodeFrequency(node)
//                 isUpdate = true
//                 operation = 'updated'
//             } else {
//                 // Add new key
//                 if (this.size >= this.capacity) {
//                     await this._evictLFU()
//                 }

//                 const newNode = new Node(key, value)
//                 this._addNodeToFreqList(1, newNode)
//                 this.keyMap.set(key, newNode)
//                 this.minFreq = 1
//                 this.size++
//             }

//             this.enableStats && this.stats.sets++

//             const responseData = {
//                 key,
//                 operation,
//                 isUpdate,
//                 size: this.size,
//                 capacity: this.capacity,
//                 oldValue: isUpdate ? oldValue : undefined,
//                 metadata: {
//                     frequency: isUpdate ? this.keyMap.get(key).freq : 1,
//                     createdAt: this.keyMap.get(key).createdAt,
//                     lastAccessed: this.keyMap.get(key).lastAccessed
//                 }
//             }

//             logger.info('CACHE_SET', {
//                 meta: {
//                     key,
//                     operation: 'set_data',
//                     isUpdate,
//                     size: this.size,
//                     timestamp: Date.now()
//                 }
//             })

//             return responseHandler(req, res, isUpdate ? 200 : 201, `Cache data ${operation} successfully`, responseData)
//         } catch (error) {
//             logger.error('LFU_CACHE_SET_ERROR', {
//                 meta: {
//                     key: req.params?.key,
//                     operation: 'set_data',
//                     error: error.message,
//                     stack: error.stack,
//                     timestamp: Date.now()
//                 }
//             })

//             return errorHandler('LFU_CACHE_CONTROLLER', next, error, req, 500)
//         }
//     }
// }

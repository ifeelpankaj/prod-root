// @ts-nocheck
import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import CustomError from '../utils/customeError.js'

const imageSchema = new mongoose.Schema({
    public_id: { type: String, required: true },
    url: { type: String, required: true }
})

const bookingSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.ObjectId, ref: 'Order', required: true },
    departureDate: { type: Date },
    dropOffDate: { type: Date },
    accepted: { type: Boolean, default: false },
    status: { type: String, enum: ['Upcoming', 'Past', 'Cancelled'], default: 'Upcoming' }
})

const cabSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    capacity: { type: Number, required: true },
    feature: { type: String, enum: ['AC', 'NON/AC'] },
    belongsTo: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    photos: [imageSchema],
    cabNumber: { type: String, required: true },
    availability: { type: String, enum: ['Available', 'Booked'], default: 'Available' },
    rate: { type: Number, default: 0 },
    isReady: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    upcomingBookings: [bookingSchema]
})

// Helper method to check for duplicate bookings
// cabSchema.methods.hasBooking = function (orderId) {
//     return this.upcomingBookings.some((booking) => booking.orderId.toString() === orderId.toString())
// }

// cabSchema.methods.updateUpcomingBookings = function () {
//     const now = new Date()
//     this.upcomingBookings = this.upcomingBookings.filter((booking) => {
//         if (booking.departureDate > now) {
//             return true
//         }
//         booking.status = 'Past'
//         return false
//     })
// }

// cabSchema.methods.addBooking = async function (orderId, departureDate, dropOffDate) {
//     try {
//         // Check for duplicate booking before adding
//         if (this.hasBooking(orderId)) {
//             throw new CustomError('Booking is already assigned to this cab', 400)
//         }

//         const newBooking = { orderId, departureDate, dropOffDate, status: 'Upcoming' }
//         this.upcomingBookings.push(newBooking)
//         this.updateUpcomingBookings()
//         await this.save()
//     } catch (err) {
//         // If it's already a CustomError, re-throw it
//         if (err instanceof CustomError) {
//             throw err
//         }
//         logger.error('Error adding booking:', { meta: { error: err } })
//         throw new CustomError('Could not add booking', 500)
//     }
// }

// cabSchema.methods.removeBooking = async function (orderId, session = null) {
//     const options = session ? { session } : {}

//     try {
//         // Filter out the booking to be removed
//         const updatedUpcomingBookings = this.upcomingBookings.filter((booking) => booking.orderId.toString() !== orderId.toString())

//         // Use findOneAndUpdate to perform an atomic update
//         const updatedCab = await this.constructor.findOneAndUpdate(
//             { _id: this._id },
//             {
//                 $set: {
//                     upcomingBookings: updatedUpcomingBookings
//                 }
//             },
//             { new: true, ...options }
//         )

//         if (!updatedCab) {
//             logger.error('Cab not found or update failed:', { meta: { cabId: this._id, orderId } })
//             return false
//         }

//         // Update the current document with the new data
//         this.upcomingBookings = updatedCab.upcomingBookings

//         return true
//     } catch (err) {
//         logger.error('Error removing booking:', { meta: { error: err, cabId: this._id, orderId } })
//         return false
//     }
// }

// cabSchema.pre('save', function (next) {
//     this.updateUpcomingBookings()
//     next()
// })

// cabSchema.index({ capacity: 1, 'upcomingBookings.departureDate': 1 })
cabSchema.methods.hasBooking = function (orderId) {
    return this.upcomingBookings.some((booking) => booking.orderId.toString() === orderId.toString())
}

cabSchema.methods.updateUpcomingBookings = function () {
    const now = new Date()
    this.upcomingBookings = this.upcomingBookings.filter((booking) => {
        if (booking.departureDate > now) {
            return true
        }
        booking.status = 'Past'
        return false
    })
}

cabSchema.methods.addBooking = async function (orderId, departureDate, dropOffDate) {
    try {
        // Check for duplicate booking before adding
        if (this.hasBooking(orderId)) {
            throw new CustomError('Booking is already assigned to this cab', 400)
        }

        const newBooking = { orderId, departureDate, dropOffDate, status: 'Upcoming' }
        this.upcomingBookings.push(newBooking)
        this.updateUpcomingBookings()
        await this.save()
    } catch (err) {
        // If it's already a CustomError, re-throw it
        if (err instanceof CustomError) {
            throw err
        }
        logger.error('Error adding booking:', { meta: { error: err } })
        throw new CustomError('Could not add booking', 500)
    }
}

// Enhanced removeBooking - same functionality but more robust
cabSchema.methods.removeBooking = async function (orderId, session = null) {
    const options = session ? { session } : {}

    try {
        // Convert orderId to string for consistent comparison
        const orderIdStr = orderId.toString()

        // Log for debugging purposes
        logger.info('Attempting to remove booking:', {
            meta: {
                cabId: this._id,
                orderId: orderIdStr,
                currentBookingsCount: this.upcomingBookings.length,
                bookingIds: this.upcomingBookings.map((b) => b.orderId.toString())
            }
        })

        // Check if booking exists before attempting removal
        const initialLength = this.upcomingBookings.length

        // Filter out the booking to be removed
        const updatedUpcomingBookings = this.upcomingBookings.filter((booking) => booking.orderId.toString() !== orderIdStr)

        // Check if any booking was actually removed
        if (updatedUpcomingBookings.length === initialLength) {
            logger.warn('No booking found to remove:', {
                meta: {
                    cabId: this._id,
                    orderId: orderIdStr,
                    availableBookings: this.upcomingBookings.map((b) => ({
                        orderId: b.orderId.toString(),
                        status: b.status,
                        departureDate: b.departureDate
                    }))
                }
            })
            return false
        }

        // Use findOneAndUpdate to perform an atomic update
        const updatedCab = await this.constructor.findOneAndUpdate(
            { _id: this._id },
            {
                $set: {
                    upcomingBookings: updatedUpcomingBookings
                }
            },
            { new: true, ...options }
        )

        if (!updatedCab) {
            logger.error('Cab not found or update failed:', {
                meta: { cabId: this._id, orderId: orderIdStr }
            })
            return false
        }

        // Update the current document with the new data
        this.upcomingBookings = updatedCab.upcomingBookings

        logger.info('Booking successfully removed:', {
            meta: {
                cabId: this._id,
                orderId: orderIdStr,
                remainingBookingsCount: this.upcomingBookings.length
            }
        })

        return true
    } catch (err) {
        logger.error('Error removing booking:', {
            meta: {
                error: err.message || err,
                stack: err.stack,
                cabId: this._id,
                orderId: orderId.toString()
            }
        })
        return false
    }
}

// Pre-save hook remains the same
cabSchema.pre('save', function (next) {
    this.updateUpcomingBookings()
    next()
})

// Enhanced debugging method (optional)
cabSchema.methods.debugBookings = function () {
    logger.info('Current upcomingBookings:')
    this.upcomingBookings.forEach((booking, index) => {
        logger.info(`  [${index}]:`, {
            orderId: booking.orderId.toString(),
            status: booking.status,
            departureDate: booking.departureDate,
            type: typeof booking.orderId
        })
    })
}

// Alternative removeBooking using $pull (keeping same behavior)
cabSchema.methods.removeBookingWithPull = async function (orderId, session = null) {
    const options = session ? { session } : {}

    try {
        const orderIdStr = orderId.toString()

        // Check if booking exists first (maintaining same behavior)
        if (!this.hasBooking(orderId)) {
            logger.warn('Booking not found:', {
                meta: { cabId: this._id, orderId: orderIdStr }
            })
            return false
        }

        // Use MongoDB's $pull operator for atomic removal
        const updatedCab = await this.constructor.findOneAndUpdate(
            { _id: this._id },
            {
                $pull: {
                    // eslint-disable-next-line object-shorthand
                    upcomingBookings: { orderId: orderId }
                }
            },
            { new: true, ...options }
        )

        if (!updatedCab) {
            logger.error('Cab not found or update failed:', {
                meta: { cabId: this._id, orderId: orderIdStr }
            })
            return false
        }

        // Update the current document with the new data
        this.upcomingBookings = updatedCab.upcomingBookings

        return true
    } catch (err) {
        logger.error('Error removing booking with pull:', {
            meta: {
                error: err.message || err,
                cabId: this._id,
                orderId: orderId.toString()
            }
        })
        return false
    }
}

// Index remains the same
cabSchema.index({ capacity: 1, 'upcomingBookings.departureDate': 1 })

export const Cab = mongoose.model('Cab', cabSchema)

import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
import {
    // cancelBooking,
    cancelBookingWithManualRollback,
    // completeBooking,
    completeBookingWithManualRollback,
    confirmBooking,
    // driverVerification,
    driverVerificationWithManualRollback,
    getDriverAllBookings,
    getDriverAllTransaction,
    getDriverUpcommingBookings,
    getDriverWalletBalance
} from '../controllers/driver.controller.js'

const router = Router()

router.route('/doc/verification').put(isAuthenticated, driverVerificationWithManualRollback)

router.route('/get/upcoming/bookings').get(isAuthenticated, getDriverUpcommingBookings)

router.route('/all/bookings').get(isAuthenticated, getDriverAllBookings)

router.route('/confirm-driver-booking').put(isAuthenticated, confirmBooking)

router.route('/cancel-driver-booking').put(isAuthenticated, cancelBookingWithManualRollback)

router.route('/complete-driver-booking').put(isAuthenticated, completeBookingWithManualRollback)

router.route('/wallet-balance').get(isAuthenticated, getDriverWalletBalance)

router.route('/get-all-transaction').get(isAuthenticated, getDriverAllTransaction)

export default router

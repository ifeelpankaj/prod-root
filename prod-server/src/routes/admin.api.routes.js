import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

import {
    adminStats,
    allAdminDriver,
    // allAssignBookingAdmin,
    allCabsAdmin,
    // allDriversAdmin,
    allOrdersAdmin,
    // allPaymentInfo,
    allUpcommingBookingsAdmin,
    allUserAdmin,
    // assignBooking,
    assignBookingWithRollback,
    cancelAdminOrder,
    getAdminAvailableCabs,
    getAllTransactionAdmin,
    // getAvailableCabs,
    getCabBookings,
    getCabUpcomingBookings,
    // getDriverInfoById,
    getTransactionDetails,
    getUserBooking,
    getUserUpcomingBookings,
    modifyBookingAdmin,
    payoutController,
    // pendingPaymentInfo,
    // verifyDriver,
    verifyDriverWithRollback
} from '../controllers/admin.controller.js'

const router = Router()

// router.route('/driverInfo/:id').get(isAuthenticated, getDriverInfoById)

// router.route('/allPendingPayment').get(isAuthenticated, allPaymentInfo)

// router.route('/PendingPayment').get(isAuthenticated, pendingPaymentInfo)

// router.route('/admin/drivers').get(isAuthenticated, allDriversAdmin)

// router.route('/admin/assign/booking').get(isAuthenticated, allAssignBookingAdmin)
//new routes for admin API
router.route('/admin/users').get(isAuthenticated, allUserAdmin)

router.route('/admin/cabs').get(isAuthenticated, allCabsAdmin)

router.route('/admin/orders').get(isAuthenticated, allOrdersAdmin)

router.route('/admin/assign/booking/:id').patch(isAuthenticated, assignBookingWithRollback)

router.route('/admin/free/cabs').get(isAuthenticated, getAdminAvailableCabs)

router.route('/admin/stats').get(isAuthenticated, adminStats)

router.route('/admin/cab/bookings/:id').get(isAuthenticated, getCabBookings)

router.route('/verify/driver/:id').patch(isAuthenticated, verifyDriverWithRollback)

router.route('/admin/cab/upcomming/booking/:id').get(isAuthenticated, getCabUpcomingBookings)

router.route('/admin/user/booking/:id').get(isAuthenticated, getUserBooking)

router.route('/admin/user/upcomming/booking/:id').get(isAuthenticated, getUserUpcomingBookings)

router.route('/admin/user/drivers').get(isAuthenticated, allAdminDriver)

router.route('/admin/order/upcomming/bookings').get(isAuthenticated, allUpcommingBookingsAdmin)

router.route('/admin/order/modify/:id').put(isAuthenticated, modifyBookingAdmin)

router.route('/admin/order/cancel/:id').patch(isAuthenticated, cancelAdminOrder)

//transaction
router.route('/admin/transactions').get(isAuthenticated, getAllTransactionAdmin)

router.route('/admin/transaction/:id').get(isAuthenticated, getTransactionDetails)

router.route('/payout').post(isAuthenticated, payoutController)

export default router

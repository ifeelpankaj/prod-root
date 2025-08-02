import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
import {
    bookCab,
    getAllPendingOrder,
    getMyBookings,
    getOrderDetail,
    getOrderDetailForCustomer,
    // paymentVerification,
    paymentVerificationWithManualRollback
} from '../controllers/order.api.controller.js'

const router = Router()

router.route('/place').post(isAuthenticated, bookCab)

router.route('/payment/verification').post(isAuthenticated, paymentVerificationWithManualRollback)

router.route('/my').get(isAuthenticated, getMyBookings)

router.route('/customer/:id').get(isAuthenticated, getOrderDetailForCustomer)

router.route('/:id').get(isAuthenticated, getOrderDetail)

router.route('/pending').get(isAuthenticated, getAllPendingOrder)

export default router

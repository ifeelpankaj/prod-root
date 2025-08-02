import { Router } from 'express'

import { isAuthenticated } from '../middlewares/auth.middleware.js'
import {
    // deleteCab,
    // getDriverOwnedCabs,
    getRateDefinedCab,
    getSingleCabs,
    makeCabReady,
    // registerCab,
    registerCabWithManulRollback,
    // updateCab,
    updateCabWithManualRollback
} from '../controllers/cab.api.controller.js'

const router = Router()

router.route('/cab/register').post(isAuthenticated, registerCabWithManulRollback)

router.route('/cab/update/:id').put(isAuthenticated, updateCabWithManualRollback)

router.route('/cab/via/display').get(isAuthenticated, getRateDefinedCab)

router.route('/cab/via/:id').get(isAuthenticated, getSingleCabs)

// router.route('/driver-owned').get(isAuthenticated, getDriverOwnedCabs)

// router.route('/delete/:id').delete(isAuthenticated, deleteCab)

router.route('/make-cab/ready/:id').get(isAuthenticated, makeCabReady)

export default router

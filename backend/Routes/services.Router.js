import express from "express";
import {
    createService,
    deleteServiceById,
    getAllServices,
    getServiceById,
    updateServiceById,
    getAllServicesByServiceProviderId
} from "../Controllers/servicesController.js";
import { allowOnly } from "../auth/verifyToken.js";
import { authenticate } from "../auth/verifyToken.js";
import { check } from "express-validator";
import { userRoles } from "../constants/userRoles.constants.js";

const router = express.Router();

router.get('/',getAllServices);
router.get('/:id',getServiceById);
router.patch('/remove/:id', authenticate, allowOnly(['service-provider', 'super-admin']), deleteServiceById);
router.get('/service-by-provider/:id', authenticate, allowOnly(['service-provider', 'super-admin']), getAllServicesByServiceProviderId);

router.post(
    '/create',
    [
        authenticate,
        allowOnly(['service-provider', 'super-admin']),
        check('title', 'Service name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty()
    ],
    createService
);

router.patch(
    '/update/:id',
    [
        authenticate,
        allowOnly(['service-provider', 'super-admin']),
        check('title', 'Service name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty()
    ],
    updateServiceById
);

export default router;
import express from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    updateProduct,
    getProductsByServiceProviderId,
    getProductsByCategory
} from "../Controllers/productsController.js";
import { allowOnly, authenticate } from "../auth/verifyToken.js";
import { check } from "express-validator";
import { userRoles } from "../constants/userRoles.constants.js";

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Get products by category
router.get('/category/:category',getProductsByCategory);

// Create a new product
router.post(
    '/create',
    [
        authenticate,
        allowOnly(['service-provider', 'super-admin']),
        check('name', 'Product name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('image', 'Image URL is required').not().isEmpty(),
    ],
    createProduct
);

// Update an existing product by ID
router.patch(
    '/update/:id',
    [
        authenticate,
        allowOnly(['service-provider', 'super-admin']),
        check('name', 'Product name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('image', 'Image URL is required').not().isEmpty(),
    ],
    updateProduct
);

// Delete a product by ID
router.patch(
    '/remove/:id',
    authenticate,
    allowOnly(['service-provider', 'super-admin']),
    deleteProduct
);

router.get(
    '/products-by-provider/:id',
    authenticate,
    allowOnly(['service-provider', 'super-admin']),
    getProductsByServiceProviderId
);


export default router;

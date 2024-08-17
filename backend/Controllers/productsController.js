import Product from '../models/ProductSchema.js';
import ServiceProvider from '../models/ServiceProviderSchema.js';
import { validationResult } from 'express-validator';

// Create a new product
export const createProduct = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, image, category, quantity } = req.body;
    const serviceProviderId = req.userId; // Assuming the userId is stored in the request object

    // return res.json({ serviceProviderId });

    try {
        // Check if the user is a service provider
        const serviceProvider = await ServiceProvider.findOne({ userId: serviceProviderId });

        // return res.json({ serviceProvider });

        if (!serviceProvider) {
            return res.status(403).json({ success: false, message: "You are not authorized to create products." });
        }

        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            serviceProviderId,
            quantity,
        });

        await product.save();

        res.status(201).json({ type: "sucess", message: "Product created successfully", product });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// Fetch all products
export const getProducts = async (req, res) => {
    try {
        // const products = await Product.findAll().populate('serviceProviderId', 'businessName');
        const products = await Product.find({});

        res.status(200).json({ type: "sucess", data: products });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// Fetch a single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('serviceProviderId', 'businessName');

        if (!product) {
            return res.status(404).json({ type: "error", message: "Product not found" });
        }

        res.status(200).json({ type: "sucess", data: product });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, image, category } = req.body;
    const serviceProviderId = req.userId;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ type: "sucess", message: "Product not found" });
        }

        if (product.serviceProviderId.toString() !== serviceProviderId) {
            return res.status(403).json({ type: "error", message: "You are not authorized to update this product." });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.category = category || product.category;

        await product.save();

        res.status(200).json({ type: "sucess", message: "Product updated successfully", product });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const serviceProviderId = req.userId;

    try {
        const productId = await Product.findById(req.params.id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ type: "error", message: "Product not found" });
        }

        if (product.serviceProviderId.toString() !== serviceProviderId) {
            return res.status(403).json({ type: "error", message: "You are not authorized to delete this product." });
        }

        await product.deleteOne({ _id: productId });

        res.status(200).json({ type: "sucess", message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// get products by service provider ID
export const getProductsByServiceProviderId = async (req, res) => {

    const serviceProviderId = req.params.id;

    try {
        const products = await Product.find({ serviceProviderId });

        res.status(200).json({ type: "sucess", message: 'Products receiving successfull', data: products });

    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

// get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category: category });

        if (products.length === 0) {
            return res.status(404).json({ type: "error", message: "No products found for this category." });
        }

        res.json({ type: "sucess", data: products });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

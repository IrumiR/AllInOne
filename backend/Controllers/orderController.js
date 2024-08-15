import OrderSchema from "../models/OrderSchema.js";
import ProductSchema from "../models/ProductSchema.js";

const createOrder = async (req, res) => {
    try {
        const { products, shippingAddress, totalAmount, userId } = req.body;

        // const productDetail = await ProductSchema.findById(products[0].productId);

        // return res.status(200).json({productDetail});


        // Validate and enhance products with service provider information
        const enhancedProducts = await Promise.all(products.map(async (product) => {
            const productDetails = await ProductSchema.findById(product.productId);
            if (!productDetails) {
                throw new Error(`Product with ID ${product.productId} not found`);
            }

            return {
                productId: product.productId,
                name: productDetails.name,
                price: productDetails.price,
                category: productDetails.category,
                quantity: product.quantity,
                image: productDetails.image,
                serviceProvider: productDetails.serviceProviderId, // Adding service provider info
            };
        }));

        // res.status(200).json({enhancedProducts});

        

        // Create the new order
        const newOrder = new OrderSchema({
            userId,
            products: enhancedProducts,
            shippingAddress,
            totalAmount,
            orderStatus: 'pending', // Default to 'pending' status
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            type: 'success',
            message: "Order created successfully",
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: "Failed to create order",
            error: error.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await OrderSchema.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete order",
            error: error.message,
        });
    }
};

const editOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const { products, shippingAddress, totalAmount, userId, orderStatus } = req.body;

        // return res.status(200).json({orderStatus});

        if (products && products.length > 0) {
            // Validate and enhance products with service provider information
            const enhancedProducts = await Promise.all(products.map(async (product) => {
                const productDetails = await ProductSchema.findById(product.productId);
                if (!productDetails) {
                    throw new Error(`Product with ID ${product.productId} not found`);
                }

                return {
                    productId: product.productId,
                    name: productDetails.name,
                    price: productDetails.price,
                    category: productDetails.category,
                    quantity: product.quantity,
                    image: productDetails.image,
                    serviceProvider: productDetails.serviceProviderId, // Adding service provider info
                };
            }));

            // Update the order with enhanced products
            const updatedOrder = await OrderSchema.findByIdAndUpdate(id, { $set: { products: enhancedProducts, shippingAddress, totalAmount, userId, orderStatus } }, { new: true });

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Order updated successfully",
                data: updatedOrder,
            });
        } else {
            // If no products are provided, just update the other fields
            const updatedOrder = await OrderSchema.findByIdAndUpdate(id, { $set: shippingAddress, totalAmount, userId, orderStatus }, { new: true });

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Order updated successfully",
                data: updatedOrder,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find().populate('userId', 'firstName lastName email').populate('products.productId', 'name category');

        return res.status(200).json({
            type: 'success',
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: "Failed to retrieve orders",
            error: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await OrderSchema.findById(id).populate('userId', 'firstName lastName email').populate('products.productId', 'name category');

        if (!order) {
            return res.status(404).json({
                type: 'error',
                message: "Order not found",
            });
        }

        return res.status(200).json({
            type: 'success',
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: "Failed to retrieve order",
            error: error.message,
        });
    }
};

export { createOrder, deleteOrder, editOrder, getAllOrders, getOrderById };
import ServiceProvider from "../models/ServiceProviderSchema.js";

export const updateServiceProvider = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: updatedServiceProvider,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

export const deleteServiceProvider = async (req, res) => {
    const id = req.params.id;

    try {
        await ServiceProvider.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

export const getSingleServiceProvider = async (req, res) => {
    const id = req.params.id;

    try {
        const serviceProvider = await ServiceProvider.findById(id).select(
            "-password"
        );

        res.status(200).json({
            success: true,
            message: "Service Provider Found",
            data: serviceProvider,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "No User Found" });
    }
};

export const getAllServiceProviders = async (req, res) => {
    try {
        const { query } = req.query;
        let serviceProviders;

        if (query) {
            serviceProviders = await ServiceProvider.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { reviews: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            serviceProviders = await ServiceProvider.find({ isApproved: "approved" }).select(
                "-password"
            );
        }

        res.status(200).json({
            success: true,
            message: "Service Providers Found",
            data: serviceProviders,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

import ServiceProvider from "../models/ServiceProviderSchema.js";
import Booking from "../models/BookingSchema.js";

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
    const serviceProvider = await ServiceProvider.findById(id)
      .populate("reviews")
      .select("-password");

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
      serviceProviders = await ServiceProvider.find({
        isApproved: "approved",
      }).select("-password");
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

export const getServiceProviderProfile = async (req, res) => {
  const serviceproviderId = req.userId;

  try {
    const serviceprovider = await ServiceProvider.findById(serviceproviderId);

    if (!serviceprovider) {
      return res
        .status(404)
        .json({ success: false, message: "Service Provider not found" });
    }

    const { password, ...rest } = serviceprovider._doc;
    const reservations = await Booking.find({
      serviceprovider: serviceproviderId,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Profile is set",
        data: { ...rest, reservations },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

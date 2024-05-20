import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import ServiceProvider from "../models/ServiceProviderSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No User Found" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({ success: true, message: "Profile is set", data: { ...rest } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    // step 1 - retrieve reservations from bookings for specific user
    const bookings = await Booking.find({ user: req.userId });

    // step 2 - extract SP ids from reservations
    const serviceproviderIds = bookings.map((el) => el.serviceprovider.id);

    // step 3 - retrieve SPs from SP ids
    const serviceproviders = await ServiceProvider.find({
      _id: { $in: serviceproviderIds },
    }).select("-password");

    res
      .status(200)
      .json({
        success: true,
        message: "Bookings are set",
        data: serviceproviders,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

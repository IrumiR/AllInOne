import mongoose from "mongoose";
import ServiceProvider from "./ServiceProviderSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    serviceprovider: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceProvider",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (serviceproviderId) {
  //this points to the current review
  const stats = await this.aggregate([
    {
      $match: { serviceprovider: serviceproviderId },
    },
    {
      $group: {
        _id: "$serviceprovider",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await ServiceProvider.findByIdAndUpdate(serviceproviderId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.serviceprovider);
});

export default mongoose.model("Review", reviewSchema);

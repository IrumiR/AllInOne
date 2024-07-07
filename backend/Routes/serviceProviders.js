import express from "express";
import {
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getSingleServiceProvider,
  getServiceProviderProfile
} from "../Controllers/serviceproviderController.js";
import { authenticate, allowOnly } from "../auth/verifyToken.js";
import reviewRoute from "../Routes/review.js"

const router = express.Router();

//nested routes
router.use("/:serviceproviderId/reviews", reviewRoute);

router.get("/:id", getSingleServiceProvider);
router.get("/", getAllServiceProviders);
router.put("/:id", authenticate, allowOnly(["serviceprovider"]), updateServiceProvider);
router.delete("/:id", authenticate, allowOnly(["serviceprovider"]), deleteServiceProvider);
router.get("/profile/me", authenticate, allowOnly(["serviceprovider"]), getServiceProviderProfile);

export default router;

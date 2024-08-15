import express from "express";
import {
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getSingleServiceProvider,
  getServiceProviderProfile,
  getServiceProviderByUserId,
  updateServiceProviderByUserId
} from "../Controllers/serviceproviderController.js";
import { authenticate, allowOnly } from "../auth/verifyToken.js";
import reviewRoute from "../Routes/review.js"

const router = express.Router();

//nested routes
router.use("/:serviceproviderId/reviews", reviewRoute);

router.get("/:id", getSingleServiceProvider);
router.get("/", getAllServiceProviders);
router.delete("/:id", authenticate, allowOnly(["service-provider"]), deleteServiceProvider);
router.get("/profile/me", authenticate, allowOnly(["service-provider"]), getServiceProviderProfile);

router.patch("/update/:id", authenticate, allowOnly(["service-provider"]), updateServiceProvider);

// get service provider by user id
router.get("/get-service-provider-by-user-id/:id", authenticate, allowOnly(['service-provider', 'super-admin']) ,getServiceProviderByUserId);

// update the services provider by user id
router.patch("/update-service-provider-by-user-id/:id", authenticate, allowOnly(['service-provider', 'super-admin']), updateServiceProviderByUserId);

export default router;

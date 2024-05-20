import express from "express";
import {
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getSingleServiceProvider,
  getServiceProviderProfile
} from "../Controllers/serviceproviderController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoute from "../Routes/review.js"

const router = express.Router();

//nested routes
router.use("/:serviceproviderId/reviews", reviewRoute);

router.get("/:id", getSingleServiceProvider);
router.get("/", getAllServiceProviders);
router.put("/:id", authenticate, restrict(["serviceprovider"]), updateServiceProvider);
router.delete("/:id", authenticate, restrict(["serviceprovider"]), deleteServiceProvider);
router.get("/profile/me", authenticate, restrict(["serviceprovider"]), getServiceProviderProfile);

export default router;

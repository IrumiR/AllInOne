import express from "express";
import {
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getSingleServiceProvider,
} from "../Controllers/serviceproviderController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleServiceProvider);
router.get("/", getAllServiceProviders);
router.put("/:id", authenticate, restrict(["serviceprovider"]), updateServiceProvider);
router.delete("/:id", authenticate, restrict(["serviceprovider"]), deleteServiceProvider);

export default router;

import express from "express";
import {
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getSingleServiceProvider,
} from "../Controllers/serviceproviderController.js";

const router = express.Router();

router.get("/:id", getSingleServiceProvider);
router.get("/", getAllServiceProviders);
router.put("/:id", updateServiceProvider);
router.delete("/:id", deleteServiceProvider);

export default router;

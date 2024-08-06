import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  getMyReservations
} from "../Controllers/userController.js";
import { authenticate, allowOnly } from "../auth/verifyToken.js";
import { userRoles } from "../constants/userRoles.constants.js";

const router = express.Router();


// super admin route functions
// get all users
router.get("/", authenticate, allowOnly(["super-admin"]), getAllUsers);
router.get("/:id", authenticate, allowOnly(["customer", "super-admin"]), getSingleUser);


// customers routes


// service provider routes


// services rounts


// shop routes


// delivery riders routes

router.put("/:id", authenticate, allowOnly(["customer"]), updateUser);
router.delete("/:id", authenticate, allowOnly(["customer"]), deleteUser);
router.get("/profile/me", authenticate, allowOnly(["customer", "super-admin", userRoles.SERVICE_PROVIDER]), getUserProfile);
router.get("/reservations/my-reservations", authenticate, allowOnly(["customer"]), getMyReservations);

export default router;

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
router.get("/:id", authenticate, getSingleUser);


// customers routes


// service provider routes


// services rounts


// shop routes


// delivery riders routes

// update any user by ID (for user info)
router.patch("/update/:id", authenticate, allowOnly(["customer", "service-provider"]), updateUser);
router.delete("/:id", authenticate, allowOnly(["customer"]), deleteUser);
router.get("/profile/me", authenticate, allowOnly(["customer", "super-admin", userRoles.SERVICE_PROVIDER]), getUserProfile);
router.get("/reservations/my-reservations", authenticate, allowOnly(["customer"]), getMyReservations);

router.get("/single/:id", getSingleUser); 


export default router;

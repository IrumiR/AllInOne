import express from "express";
import {
    getAllReviews,
    createReview,
} from "../Controllers/reviewController.js";
import { authenticate, allowOnly } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(getAllReviews)
    .post(authenticate, allowOnly(["customer"]), createReview);

export default router;

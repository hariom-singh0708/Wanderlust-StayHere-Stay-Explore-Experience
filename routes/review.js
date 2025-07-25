const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, isReviewOwner } = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/review.js");


//Reviews Post Route
router.post("/", isLoggedIn, wrapAsync(createReview));

//Delete Review
router.delete("/:revId", isLoggedIn, isReviewOwner, wrapAsync(destroyReview));

module.exports = router;


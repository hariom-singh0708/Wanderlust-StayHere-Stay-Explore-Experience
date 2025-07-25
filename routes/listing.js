const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListing, createNewListing, renderEditForm, editListing, deleteListing} = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js")
const upload = multer({storage});


//Home Listings Route
router.get("/", wrapAsync(index));

//Open new Listing Form
router.get("/new", isLoggedIn, wrapAsync(renderNewForm));

//Show Route
router.get("/:id", wrapAsync(showListing));

//Create new Listing Route
router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createNewListing));

// Edit Page route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

// Update Edit route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(editListing));

//Delete listing Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
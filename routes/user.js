const express =require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync")
const { signupUser, renderSignupForm, renderLoginForm, loginUser, logoutUser } = require("../controllers/user");

router.get("/signup", renderSignupForm);

router.post("/signup", wrapAsync(signupUser));

router.get("/login", renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , wrapAsync(loginUser));

router.get("/logout", logoutUser);

module.exports = router;

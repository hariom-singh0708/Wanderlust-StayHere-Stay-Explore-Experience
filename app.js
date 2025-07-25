// ─── Imports ───────────────────────────────────────────────────────────────────
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ─── Models ────────────────────────────────────────────────────────────────────
const User = require("./models/user");

// ─── Routes ────────────────────────────────────────────────────────────────────
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user")

// ─── Utils ─────────────────────────────────────────────────────────────────────
const ExpressError = require("./utils/ExpressError");

// ─── App Setup ─────────────────────────────────────────────────────────────────
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ─── MongoDB Connection ────────────────────────────────────────────────────────
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const ATLASDB = process.env.ATLASDB_URL;
main()
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("DB Connection Error:", err));

async function main() {
  await mongoose.connect(ATLASDB);
}

// ─── Session Configuration ─────────────────────────────────────────────────────

const store = MongoStore.create({
  mongoUrl: ATLASDB,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("Error in MongoDB Session Store", err);
});

const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));

app.use(flash());

// ─── Passport Configuration ────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ─── Flash Middleware ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // Optional: To access user in all views
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ─── 404 Error Handler ─────────────────────────────────────────────────────────
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ─── Global Error Handler ──────────────────────────────────────────────────────
app.use((err,req,res, next)=>{
    console.log("-----ERROR-----");
    let {status = 500, message = "Something Went Wrong!"} = err;
    if (res.headersSent) {
    return next(err);
    }
    res.status(status).render("error.ejs", {message});
});

// ─── Server Listener ───────────────────────────────────────────────────────────
app.listen(8080, () => {
  console.log("Server running at: http://localhost:8080");
});
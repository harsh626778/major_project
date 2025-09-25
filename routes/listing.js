if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const Listing = require("../models/listing.js");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

const router = express.Router();

router
  .route("/")
  //Index Route
  .get(listingController.index)
  //Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    listingController.createListing
  );

router.get("/new", isLoggedIn, listingController.newListing);

router.get("/search", async (req, res) => {
  const query = req.query.q || ""; // agar empty ho to "" le lo

  const listings = await Listing.find({
    title: { $regex: query, $options: "i" }
  });

  res.render("listings/search.ejs", { listings, query });
});


router
  .route("/:id")
  //Show Route
  .get(listingController.showListing)
  //Update Route
  .put(isLoggedIn, isOwner, upload.single("listing[image]"),listingController.updateListing)
  //Delete Route
  .delete(isLoggedIn, isOwner, listingController.destroyListing);

// New Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;

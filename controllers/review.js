const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async(req, res) => {
    const listing = await Listing.findById(req.params.id); // ✅ Now this will work
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res) => {
    let {id, revId} =  req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: revId}});
    await Review.findByIdAndDelete(revId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};
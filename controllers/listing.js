const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews", 
        populate: {
            path: "author"
        },
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing })
};

module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url, filename};
    await newlisting.save()
    req.flash("success", "New Listing Created");
    res.redirect("/listings")
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)

    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_300");

    res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const updatedListing = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, updatedListing, { new: true });

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        listing.save();
    }
    
    req.flash("success", "Listing Update Successfully");
    res.redirect(`/listings/${id}`); // ✅ Correct path
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if (listing) {
        console.log("Deleted Listing: " + listing.title);
    }
    req.flash("success", "Listing Deleted");

    res.redirect("/listings");
};
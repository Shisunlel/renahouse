const middlewareObj = require("../../yelpcamp_deploy/middleware");

const express = require("express"),
  router = express.Router(),
  House = require("../models/house"),
  middleware = require("../middleware");

//houses - search result
router.get("/", (req, res) => {
  House.find({}, (err, allHouses) => {
    if (err || !allHouses){
      req.flash("error", err.message);
      res.redirect("back");
    }
    else{
      res.render("houses/house", { houses: allHouses });
    }
  });
});

//show new house form
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("houses/new");
});

//create new
router.post("/", middleware.isLoggedIn, (req, res) => {
    let title = req.body.title,
        price = req.body.price,
        desc = req.body.description,
        image = req.body.image,
        location = req.body.location,
        type = req.body.type,
        host = {
            id: req.user.id,
            username: req.user.name
        };
    let newHouse = {
        title: title,
        price: price,
        description: desc,
        image: image,
        location: location,
        type: type,
        host: host
    };
  House.create(newHouse, (err, newHouse) => {
    if (err || !newHouse){
      req.flash("error", err.message);
      res.redirect("back");
    }
    else{
      req.flash("success", "Successfully added new house into database");
      res.redirect("/house");
    }
  });
});

//each house
router.get("/:id", (req, res) => {
  House.findById(req.params.id)
    .populate("comments")
    .exec((err, found) => {
      if (err || !found){
        req.flash("error", err.message);
        res.redirect("/house");
      } 
      else{
        res.render("houses/show", { house: found });
      } 
    });
});

//edit house
router.get("/:id/edit", middleware.checkHouseOwnership, (req, res) => {
  House.findById(req.params.id, (err, found) => {
    if (err || !found){
      req.flash("error", err.message);
      res.redirect("/house");
    } 
    else res.render("houses/edit", { house: found });
  });
});

//update house
router.put("/:id", middleware.checkHouseOwnership, (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body.house, (err, updated) => {
    if (err || !updated){
      req.flash("error", err.message);
      res.redirect("/house");
    }
    else{
      req.flash("success", "Successfully updated a house with this id");
      res.redirect("/house/" + req.params.id);
    }
  });
});

//delete house
router.delete("/:id", middleware.checkHouseOwnership, (req, res)=>{
    House.findByIdAndRemove(req.params.id, (err, deleted)=>{
      if(err){
        req.flash("error", err.message);
      }
      res.redirect("back");
    });
})


module.exports = router;
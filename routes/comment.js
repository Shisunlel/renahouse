const middlewareObj = require("../../yelpcamp_deploy/middleware");
const { isLoggedIn } = require("../../yelpcamp_deploy/middleware");

const express = require("express"),
  router = express.Router({ mergeParams: true }),
  House = require("../models/house"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");

//comment form
router.get("/comments/new", middleware.isLoggedIn, (req, res) => {
  //find house id that assocciated with comments
  House.findById(req.params.id, (err, found) => {
    if (err || !found) res.redirect("/house");
    else res.render("comments/new", { house: found });
  });
});

//CREATE COMMENT
router.post("/comments", middleware.isLoggedIn, (req, res) => {
  //find house id that assocciated with comments
  House.findById(req.params.id, (err, house) => {
    if (err || !house) {
      res.redirect(`/house/${house._id}`);
    } else {
      Comment.create(req.body.comment, (err, newComment) => {
        //add user id and name into comment model
        newComment.author.id = req.user.id;
        newComment.author.username = req.user.username;
        newComment.save();
        //add comment to house
        house.comments.push(newComment);
        house.save();
        res.redirect(`/house/${house._id}`);
      });
    }
  });
});

//EDIT
router.get("/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) res.redirect("back");
    else
      res.render("comments/edit", {
        house_id: req.params.id,
        comment: foundComment,
      });
  });
});

//UPDATE
router.put("/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, foundComment) => {
      if (err || !foundComment) res.redirect("/house/" + req.params.id);
      else res.redirect("/house/" + req.params.id);
    }
  );
});

//DELETE
router.delete("/comments/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, deleted) => {
    if (err || !deleted) res.redirect("back");
    else res.redirect("/house/" + req.params.id);
  });
});

module.exports = router;

const middlewareObj = {},
  House = require("../models/house"),
  Comment = require("../models/comment");

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
  }
};

middlewareObj.checkHouseOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    House.findById(req.params.id, (err, house) => {
      if (err || !house) {
        req.flash("error", "Cannot find house with this id");
        res.redirect("back");
      } else {
        if (house.host.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "Sorry, you are not the owner of this house");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    House.findById(req.params.id, (err, house) => {
      if (err || !house) {
        req.flash("error", "Cannot find house with this id");
        return res.redirect("back");
      }
      Comment.findById(req.params.comment_id, (err, comment) => {
        if (err || !comment) {
          req.flash("error", "Cannot find comment with this id");
          res.redirect("back");
        } else {
          if (comment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "Sorry, you are not the owner of this comment");
            res.redirect("back");
          }
        }
      });
    });
  }else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect('back');
  }
};


module.exports = middlewareObj;
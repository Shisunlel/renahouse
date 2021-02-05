const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  seedDB = require("./seed"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  House = require("./models/house"),
  User = require("./models/user"),
  Comment = require("./models/comment"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//connect to db
mongoose
  .connect("mongodb://localhost/rentahouse", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conneted");
  })
  .catch((err) => {
    console.log("Erorr", err);
  });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB();

//PASSPORT CONFIGURE
app.use(
  require("express-session")({
    secret: "YOURMOM",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//index
app.get('/', (req, res)=>{
  res.render('index');
});

//houses - search result
app.get("/house", (req, res) => {
  House.find({}, (err, allHouses) => {
    if (err) console.log(err);
    else res.render("houses/house", { houses: allHouses });
  });
});

//show new house form
app.get("/house/new", (req, res) => {
  res.render("houses/new");
});

//create new
app.post("/house", (req, res) => {
  House.create(req.body.house, (err, created) => {
    if (err) console.log("Fail creating new hosue");
    else res.redirect("houses/house");
  });
});

//each house
app.get("/house/:id", (req, res) => {
  House.findById(req.params.id)
    .populate("comments")
    .exec((err, found) => {
      if (err) res.redirect("/house");
      else res.render("houses/show", { house: found });
    });
});

//LOGIN ROUTE

//registration form
app.get("/register", (req, res) => {
  res.render("register");
});

//SIGN UP LOGIC
app.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/house");
    });
  });
});

//LOGIN FORM
app.get("/login", (req, res) => {
  res.render("login");
});

//LOGIN LOGIC
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/house",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

//LOGOUT
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/house");
});

//comment form
app.get("/house/:id/comments/new", (req, res) => {
  //find house by id
  House.findById(req.params.id, (err, house) => {
    if (err || !house) {
      res.redirect("back");
    } else {
      res.render("comments/new", { house: house });
    }
  });
});

//CREATE COMMENT
app.post("/house/:id/comments", (req, res) => {
  //look up campgrund using id
  House.findById(req.params.id, (err, house) => {
    if (err) {
      console.log(err);
      res.redirect("/house");
    } else {
      //create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          //add user id and username
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //connect comment to campgrund
          comment.save();
          house.comments.push(comment);
          house.save();
          //redirect to house show
          res.redirect(`/house/${house._id}`);
        }
      });
    }
  });
});

//EDIT
app.get("/house/:id/comments/:comment_id/edit", (req, res) => {
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
app.put("/house/:id/comments/:comment_id", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) res.redirect("back");
      else res.redirect("/house/" + req.params.id);
    }
  );
});

//DELETE
app.delete("/house/:id/comments/:comment_id", (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/house/" + req.params.id);
    }
  });
});

//listening port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Listening to port", port);
});

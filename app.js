const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  flash = require("connect-flash"),
  seedDB = require("./seed"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  House = require("./models/house"),
  User = require("./models/user"),
  Comment = require("./models/comment"),
  app = express();

const houseRoute = require("./routes/houses"),
  authRoute = require("./routes/index"),
  commentRoute = require("./routes/comment");

//connect to db
mongoose
  .connect(process.env.DATABASEURL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conneted");
  })
  .catch((err) => console.log("Erorr", err.message));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/house", houseRoute);
app.use("/", authRoute);
app.use("/house/:id", commentRoute);

app.get('*', (req, res)=>{
  res.send("ERROR 404: PAGE NOT FOUND");
});


//listening port
const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log("Listening to port", port);
});

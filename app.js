const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const {
  check,
  validationResult
} = require('express-validator/check');

const {
  matchedData,
  sanitize
} = require('express-validator/filter');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = ({
  name: String,
  username: String,
  phonenumber: Number,
  email: String,
  password: String,
  confirmpassword: String


});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/logout", function(req, res) {
  res.render("logout");
});



app.post("/register", [
    check('name', 'Enter Name').not().isEmpty(),
    check('username', 'Enter username').not().isEmpty(),
    check('phonenumber', 'Enter phone number').trim().isLength({
      min: 10,
      max: 10
    }),
    check('email', 'Enter valid email').trim().isEmail().normalizeEmail(),

    check('password', 'password minimum of 5 characters').not().isEmpty().trim().isLength({
      min: 5
    })
  ]

  ,
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      console.log(errors.mapped())
      res.render("register", {
        title: "Register",
        errors: errors.mapped()
      })
    } else {
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      newUser.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.render("index");
        }
      });
    }


  });
app.post("/login", function (req, res) {
    User.findOne({ email: req.body.email }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.password = bcrypt.hashSync(req.body.password, salt);
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    res.render("index");
                }
            }
        }
    });
});


app.listen(3000, function() {
  console.log("Server started on port 3000.")
});

const { User } = require("../models/user");
const { Token } = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const sendEmail = require("../utils/sendmail");
const crypto = require("crypto");
const mail = fs.readFileSync("mail.html", "utf-8");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "habeebolamide592@gmail.com",
    pass: "srtytlwajxtigfsr",
  },
});

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });
    let details = {
      from: '"DarkFire2.8" habeebolamide592@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "testing our nodemailer", // plain text body
      html: mail, // html body
    };
    user
      .save()
      .then((result) => {
        transporter.sendMail(details, (err) => {
          console.log(err);
        });
        res.json({
          message: "User Added Sucessfully",
        });
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });
};

const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            const token = jwt.sign(
              { _id: user._id, isAdmin: user.isAdmin },
              "A(56LDr",
              { expiresIn: "1h" }
            );
            res.json({
              message: "Login Successful",
              token: token,
            });
          }
           else {
            res.json({
              message: "Invalid password",
              error: err,
            });
          }
        });
      } else {
        res.json({
          message: "No User Found",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: "Invalid Credentials",
      });
    });
};

const forgotpassword = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({message:"user with given email doesn't exist"});

  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const link = `http://localhost:8080/password-reset/${user._id}/${token.token}`;
  await sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  res.json({
    message: "password reset link sent to your email account",
  });
};

const resetpassword = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send("invalid link or expired");

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) return res.status(400).send("Invalid link or expired");

  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    User.findByIdAndUpdate( {_id:user._id}, {
      password: hashedPass,
  } ).then( result => {
      token.deleteOne();
      res.json({
          message : "password reset sucessfully"
      })
  })
  });

};
module.exports = {
  register,
  login,
  forgotpassword,
  resetpassword,
};

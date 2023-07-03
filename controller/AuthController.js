const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: 'habeebolamide592@gmail.com',
    pass: 'rezflpeptgczvdgy'
  }
});

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10 , function(err, hashedPass) {
        if (err) {
           res.json({
            error :err
           })
        }
        let user = new User ({
            name:req.body.name,
            email:req.body.email,
            phone : req.body.phone,
            password:hashedPass
        })
        let details = {
          from: '"DarkFire2.8" habeebolamide592@gmail.com', // sender address
          to:req.body.email , // list of receivers
          subject: "Hello ✔", // Subject line
          text: "testing our nodemailer", // plain text body
          html: "<b>Hello world?</b>", // html body
        }
        user.save()
        .then ((result) => {
           transporter.sendMail(details, (err) =>{
            console.log(err);
           });
                res.json({
                    message :"User Added Sucessfully",
                })
        })
        .catch(err => {
            res.json({
                error : err.message
            })
        })
    })
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
              const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'A(56LDr', { expiresIn: '1h' });
              res.json({
                message: "Login Successful",
                token: token,
              });
            } else {
              res.json({
                message: "Invalid password",
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
  

module.exports = {
    register,
    login
}


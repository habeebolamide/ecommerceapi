const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        user.save()
        .then ( result => {
                res.json({
                    message :"User Added Sucessfully"
                })
        })
        .catch(err => {
            res.json({
                error : "An Error Occured"
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
              const token = jwt.sign({ _id: user._id }, 'A(56LDr', { expiresIn: '1h' });
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


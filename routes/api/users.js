const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require('../../models/index')


const User = db.users;
const Post = db.posts;
const Category = db.categories;

const verifyUser = function(req, res, next) {
  User.findOne({ where : { email : req.body.email }}).then( data => {
    if(!data)
      return res.json({message : "User does not exist."})
    if(data.isVerified === false)
      return res.json({message : "Not a verified user."})
    
  });
  next();
}

router.post("/register", (req, res) => {

  User.findOne({ where : {email : req.body.email}}).then( user => {
    if(user) return res.json({ message : "User already exists."})
  });
  var pass = bcrypt.hashSync(req.body.password,12);
  var token = crypto.randomBytes(20).toString('hex');

  const newUser = {
    username : req.body.username,
    email : req.body.email,
    password : pass,
    newUserToken : token

  }

  var smtptransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'vankar.chirag@gmail.com',
           pass: keys.PASSWORD
       }
   });

  /*const smtptransport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'olaf.cormier@ethereal.email',
      pass: 'N1RqCncS8ZCGgPfEdM'
  }
});*/

var mailOptions = { 
  to : req.body.email,
  from : 'vankar.chirag@gmail.com',
  subject : 'Verify User',
  text : 'Click the link to verify account.' + 'http://192.168.2.244:3001/verify/' +token
};

smtptransport.sendMail(mailOptions, function(err, info){
  if(err) console.log(err);
  console.log(info);
  });
  User.create(newUser).then( user => {
        res.json({message : "Mail sent your Id", status : "created"})
      });
});                     
  
router.get('/all', function(req, res){
  User.findAll({ include : Post }).then( user => {
    res.json(user);
  })
  .catch( err => {
    res.status(500).json(err);
  })
});

router.get('/:id', function(req, res){
  User.findOne({ where : { id : req.params.id} ,include : Post }).then( user => {
    if(!user)
      return res.status(404).json({message : "User not found"})
    res.json(user);
  })
  .catch( err => {
    res.status(500).json(err);
  })
});



router.post('/verify/:token', (req, res) =>{
  User.update( { isVerified : true }, { where : { newUserToken : req.params.token }}).then( num => {
    if(num == 1 ) return res.json({message : "User verified."})
  })
});

router.post('/login', verifyUser,(req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne( { where : {email : email}}).then(user => {
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
          const payload = {
          id: user.id,
          username: user.username,
          email : user.email
        };
  
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: token
            });
          });
      }
      else {
        return res
          .json({ message : "Password incorrect" });
      }
    });
  });
});

router.post('/forget', function(req, res){

    User.findOne( { where : { email : req.body.email}}).then( user => {
      if(!user) return res.json({message : "User not found."});
      else{

          const token = crypto.randomBytes(16).toString('hex');
          user.resetPasswordToken = token;
          user.save();
          user.reload();
          /*const smtptransport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'olaf.cormier@ethereal.email',
                pass: 'N1RqCncS8ZCGgPfEdM'
                  }
            });*/
            
            var smtptransport = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                     user: 'vankar.chirag@gmail.com',
                     pass: keys.PASSWORD
                 }
             });
          
          var mailOptions = {
            to : user.email,
            from : 'vankar.chirag@gmail.com',
            subject : 'Forgot password',
            text : 'Click the link to reset password.' + 'http://192.168.2.244:3001/resetpass/' + token 
          };
        
          smtptransport.sendMail(mailOptions, function(err){
            if(err) return res.json(err);
            else{
              res.json({message : "Mail sent to your ID."});
              }
            });
          
      }
    })
});



router.post('/reset/:token', function(req, res) {
    const password = bcrypt.hashSync(req.body.password, 12);
    User.update( { password : password, resetPasswordToken : null }, { where : { resetPasswordToken : req.params.token }}).then( num => {
      if(num == 1) return res.json({message : "Password updated."})
      else return res.json({message : "Error occured"})
    })    
});

router.put('/changepass', (req, res) =>{
  const email = req.body.email;
  var password = req.body.password;
  
  
    User.findOne( { where : {email : email} }).then(user => {
    if(!user)
      return res.json({message : "User not found"});
    bcrypt.compare(password, user.password).then(isMatch =>{
      if(isMatch){
        
        const hashedpass =bcrypt.hashSync(req.body.newpassword, 12);
        User.update( { password : hashedpass }, { where : { email : email}}).then( num => {
          if(num == 1) return res.json({message : "Passoword Changed."})
        })
      }
      else
        return res.json({message : "Wrong Password"});
    });
  });
});
    
router.delete('/del', function(req, res){
  Post.destroy({ where : {}, truncate : false}).then(console.log('Cleared posts'));
  Category.destroy({ where : {}, truncate : false}).then(console.log('Cleared categories'));
  User.destroy({ where : {}, truncate : false}).then(console.log('Cleared users'));
  res.json({message : "Cleared"})
})
  module.exports = router;



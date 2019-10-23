const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const passport =require('passport');

//User module
const User = require('../models/User');

//login
router.get('/login',(req,res)=>{
    res.render('login');
})
//register
router.get('/register',(req,res)=>{
    res.render('register');
})

//Register Handle
router.post('/register',(req,res)=>{
      const Fname = req.body.Fname;
      const Lname = req.body.Lname;
      const password = req.body.password;
      const password2 = req.body.password2;
      const email = req.body.email;
      const phone = req.body.phone;
      const add1 = req.body.add1;
      const add2 = req.body.add2;
      const city = req.body.city;
      const state = req.body.state;

      let err = [];

      //checking fields
      if (!Fname || !Lname || !password || !password2 || !email || !phone ||
        !add1 || !city || !state)
        {
            err.push({msg:'Enter all Required Fields'});
        }
    
        //passwords match
        if(password !== password2)
        {
            err.push({
                msg:'Passwords Do Not Match!'
            });
        }

        //checking phone num
        if(phone < 1000000000 || phone > 9999999999)
        {
            err.push({
                msg:'Enter 10 digit mobile number'
            });
        }
        //check pass length
        if(password.length < 6)
        {
            err.push({
                msg:'Password should be 6 char strong'
            });
        }

        if(err.length > 0)
        {   
            //if error rerender
            res.render('register',{
                err,
                Fname,
                Lname,
                password,
                password2,
                email,
                phone,
                add1,
                add2,
                city,
                state
            });
        }else{
             //validation passed
            User.findOne({
                email:email
            }).then( user =>{
                if(user){
                    //user exists
                    err.push({
                        msg:'Email Already Registered'
                    });
                    res.render('register',{
                        err,
                        Fname,
                        Lname,
                        password,
                        password2,
                        email,
                        phone,
                        add1,
                        add2,
                        city,
                        state
                    });
                }
                else{
                    const newUser = new User({
                        Fname,
                        Lname,
                        password,
                        password2,
                        email,
                        phone,
                        add1,
                        add2,
                        city,
                        state
                    });
                    //hash password
                    bycrypt.genSalt(10, (err,salt)=>
                        bycrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err) throw err ;
                            //set password to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                            .then(user =>{
                                req.flash('success_msg','You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                        })
                    );
                }
            });
        }


});

//login handle
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash: true
    }
    )(req,res,next);
});

//logout handle
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You Are Logged Out');
    res.redirect('/users/login');
});

module.exports = router;
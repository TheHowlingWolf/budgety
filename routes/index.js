const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
//Render Index Page
router.get('/',(req,res)=>{
    res.render('index');
});

//render dashboard
router.get('/dashboard', ensureAuthenticated ,(req,res)=>{
    res.render('dashboard',{
        Fname:req.user.Fname,
        Lname:req.user.Lname,
        email:req.user.email,
        phone:req.user.phone,
        add1:req.user.add1,
        add2:req.user.add2,
        city:req.user.city,
        state:req.user.state,
        DOJ:req.user.DOJ
    });

});

//render profile
router.get('/profile',(req,res)=>{
    res.render('profile');
});




module.exports = router;
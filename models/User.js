const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Fname: {
        type:String,
        required:true
    },
    Lname: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    password2: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    add1:{
        type:String,
        required:true
    },
    add2:{
        type:String,
        default:''
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    DOJ:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;
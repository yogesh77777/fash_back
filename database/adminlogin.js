/* category schema */
const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const login = new Schema({
    email:{type:String,unique:true},
    password:String,
});
module.exports = mongoose.model('adminlogin',login);
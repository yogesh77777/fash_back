const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = new Schema({
    email:{type:String,unique:true},
    password:String,
    mobile:{type:Number,unique:true}
});
module.exports = mongoose.model('myuser',log);
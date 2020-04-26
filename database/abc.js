const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const c = new Schema({
    pname:String,
    email:String,
    qty:Number,
    size:String,
    brand:String,
    price:Number,
    color:String,
    total:Number,
    gtotal:Number,
    created_at:{ type: Date, default: Date.now }

});
module.exports = mongoose.model('crt',c);

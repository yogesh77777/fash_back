const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const od = new Schema({
    pname:String,
    email:String,
    qty:Number,
    size:String,
    brand:String,
    price:Number,
    color:String,
    total:Number,
    gtotal:Number,
    address:String,
    mobile:Number,
    altmobile:Number,
    status:String,
    created_at:{ type: Date, default: Date.now }

});
module.exports = mongoose.model('odr',od);

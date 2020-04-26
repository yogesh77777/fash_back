const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pro = new Schema({
    pname:{type:String,unique:true},
    description:String,
    image:String,
    brand:String,
    price:Number,
    category:String,
    created_at:{ type: Date, default: Date.now }
});
module.exports = mongoose.model('products',pro);
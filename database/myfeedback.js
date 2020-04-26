/* category schema */
const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feed = new Schema({
    name:{type:String},
    email:String,
    subject:String,
    message:String,
    created_at:{ type: Date, default: Date.now }
});
module.exports = mongoose.model('myfeedback',feed);
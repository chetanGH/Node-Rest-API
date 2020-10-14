const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        uppercase:true
    },
    email:{
        type:String,
        lowercase:true
    }, 
    mobile:Number, 
    address:{
        flat:String,
        addressLine1:String,
        addressLine:String,
        City:String,
        state:String,
        pincode:Number
    }
});

mongoose.model('users',userSchema,'users');
module.exports = {
    users:userSchema
}
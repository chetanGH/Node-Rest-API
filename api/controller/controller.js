const mongoose = require('mongoose');
const user = mongoose.model('users');
const Joi = require('@hapi/joi');//validation library form Hapi.js
const async = require('async')



function isEmpty(strIn)
{
    if (strIn === undefined)
    {
        return true;
    }
    else if(strIn == null)
    {
        return true;
    }
    else if(strIn == "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * @Function Create New User.
 * @Method POST.
 * @author Chetan Hebsur 
 * @Validations Handled.
 * @returns Single object of mongodb with success message.
 * */ 
module.exports.addUser = (req,res)=>{
    try {
        let payload = Joi.object().keys({
            name:Joi.string().required(),
            email:Joi.string().email().required(), 
            mobile:Joi.number().min(10).required(), 
            address:Joi.object().keys({
                flat:Joi.string().required(),
                addressLine1:Joi.string().required(),
                addressLine:Joi.string().required(),
                City:Joi.string().required(),
                state:Joi.string().required(),
                pincode:Joi.number().required()
            })
        });
        
        let {error,value} = payload.validate(req.body)
        if(error){
            console.log(error);
            res.status(400).send({success:false,message:error.details[0].message});
        }
        if(isEmpty(value.name) == false && isEmpty(value.email) == false && isEmpty(value.mobile) == false ){
            let NewUser = new user(value);
            NewUser.save((err,saved)=>{
                if(err){
                    console.log(err);
                    res.status(500).send({success:false,message:'Internal server error.'})
                }else if(!saved){
                    res.status(200).send({success:false,message:'Unable to store user.'})
                }else{
                    res.status(201).send({success:true,message:'User created.',response:saved})
                }
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Internal server error.'})
    }
}

/**
 * @function Fetch-all-Users.
 * @Method GET.
 * @author Chetan Hebsur 
 * @validations Handled.
 * @returns Single object of mongodb with success message.
 * */ 
module.exports.FetchAllUsers = async(req,res)=>{
    try {
        user.find().exec((err,allUsers)=>{
            if(err){
                console.error(err);
                res.status(500).send({success:false,message:'Internal server error.'})
            }else if(allUsers.length == 0){
                res.status(200).send({success:true,message:'No users found.'})
            }else{
                res.status(200).send({success:true,message:'Users found.',response:allUsers});
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({success:false,message:'Internal server error.'})
    }
}
const mongoose = require('mongoose')
const validator = require('validator')

const accountSchema = new mongoose.Schema({
    url:{
        required: true,
        unique: true,
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Unvalid URL")
        }
    },
    category:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    reach:{
        type: Number
    },
    subscribersIncome:{
        type: Number
    },
    percentTAgeo:{
        type: Number
    },
    percentTAsex:{
        type:Number
    },
    percentTAage:{
        type:Number
    },
    percentTA:{
        type:Number
    },
    costReachTA:{
        type:Number
    }



})


const Account = mongoose.model('Accounts', accountSchema)


module.exports = Account
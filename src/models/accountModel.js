const mongoose = require('mongoose')
const validator = require('validator')

const accountSchema = new mongoose.Schema({
    //given 
    url:{
        type:String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Unvalid URL")
        }
    },
    theme:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    reach:{
        type: String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for reach")
        }
    },
    subscribersIncome:{
        type: String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for subscribersIncome")
        }
    },
    cost:{
        type:String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for cost")
        }
    },
    percentTAgeo:{
        type: String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for percentTAgeo")
        }
    },
    percentTAsex:{
        type:String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for percentTAsex")
        }
    },
    percentTAage:{
        type:String,
        validate(value){
            if(!validator.isNumeric(value))
                throw new Error("Enter numbers for percentTAage")
        }
    },
    description:{
        type:String
    },
    //calculated
    TA:{
        type:Number
    },
    costReachTA:{
        type:Number
    },
    costReach:{
        type:Number
    },
    subscriberCost:{
        type:Number
    },



})
accountSchema.statics.findByUrl = async(url) =>{
    const account = await Account.findOne({url})
    if(!account)
        throw new Error('Cant find account')
    return account
}

const Account = mongoose.model('Accounts', accountSchema)


module.exports = Account
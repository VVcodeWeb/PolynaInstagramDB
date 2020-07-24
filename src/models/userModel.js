const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        minlength: 4,
        trim:true
    }
})
/** 
 * <p>Method tries to find user first, if not throw error
 * <p>Compare password from user and given one, throw error
 * @return user
 * 
*/
userSchema.statics.findByEmailPassword = async(email, password) => {
    const user = await User.findOne({ email })
    if(user == null){
        throw new Error("Unable to login")
    }
    if(!bcrypt.compare(password, user.password)){
        throw new Error("Unable to login")
    } 
    return user
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

/**
 * Model contains email and password
 * has {@link #findByEmailPassword(email, password)} method to find user in db
 */
const User = mongoose.model('User', userSchema)

module.exports = User
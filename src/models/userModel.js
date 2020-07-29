const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    }, 
    tokens: [{
        token:{
            createAt: {
                type: Date,
                default: Date.now(),
                index: { expires: 60*1 }
            },
            type:String,
            timestamps: true
        }
    }]
  
})

/**
 * TODO> TTL TOKENS IN DB
 */

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

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    user.tokens = user.tokens.concat({ token })
    user.tokens[0].createAt = Date.now()
    await user.save()
    
    return token
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

/**
 * Model contains email and password
 * has {@link #findByEmailPassword(email, password)} method to find user in db
 */
const User = mongoose.model('User', userSchema)




module.exports = User
const express = require('express')
const User = require('../models/userModel')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const router = new express.Router


/** 
 * 
 * TODO: need to create generate cookie function
*/
router.post("/users", async(req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(`you have been registered successfully, ${user}`)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async(req, res) =>{
    try {
        const user = await User.findByEmailPassword(req.body.email, req.body.password)
        res.redirect("/database")   
    } catch (e) {
        res.status(404).send("error;")
    }
    
})



module.exports = router
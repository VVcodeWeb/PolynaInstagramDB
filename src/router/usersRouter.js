const express = require('express')
const User = require('../models/userModel')
const router = new express.Router

router.post("/users", async(req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send("you have been registered successfully")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async(req, res) =>{
    try {
        const user = await User.findByEmailPassword(req.body.email, req.body.password)
        res.send(user)   
    } catch (e) {
        res.status(404).send("cant" + e)
    }
    
})







module.exports = router
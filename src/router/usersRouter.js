const express = require('express')
const User = require('../models/userModel');
const router = new express.Router
const auth = require('../middleware/auth')

/*------- Users -------*/

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
        const token = await user.generateAuthToken()
        res.cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
        res.redirect("/database")   
    } catch (e) {
        res.status(400).send(e)
    }
    
})


router.get("/users/status", auth, async(req, res) => {
    res.status(200).send("User is logged")
})

router.get("/users/logout", auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("Logged out")
    } catch (e) {
        res.status(500).send(`${e}. Error occured in deleting stage`)
    }
})

module.exports = router
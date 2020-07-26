const express = require('express')
const User = require('../models/userModel');
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
        const token = await user.generateAuthToken()
        res.locals.token = token
        res.redirect("/database")   
    } catch (e) {
        res.status(404).send("error;")
    }
    
})

router.get("/users/logout", async(req, res) => {
    try {
      
    } catch (e) {
        res.status(422).send(`${e}. Error occured in deleting stage`)
    }
})

module.exports = router
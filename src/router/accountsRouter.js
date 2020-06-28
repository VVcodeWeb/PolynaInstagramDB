const express = require('express')
const router = new express.Router
const Account = require('../models/accountModel')



router.post('/account', async(req, res) => {
    const account = createAccount(req.body)
    try {
        await account.save()
        res.status(201).send("Saved")
    } catch (e) {
        res.status(400).send(e)
    }
})

function createAccount(body){

    const TA = body.percentTAgeo/100 * body.percentTAage/100 * body.percentTAsex/100
    const costReach = body.cost / body.reach
    const costReachTA = body.cost / (body.reach * TA)
    const subscriberCost = body.cost / body.subscribersIncome
    
    const newAccount = new Account(body)
    newAccount.TA = TA.toFixed(2)
    newAccount.costReach = costReach.toFixed(2)
    newAccount.costReachTA = costReachTA.toFixed(2)
    newAccount.subscriberCost = subscriberCost.toFixed(2)
    return newAccount
}


module.exports = router 
const express = require('express')
const router = new express.Router()
const ITEMS = require('./fake.Db')
const ExpressError = require('./error');


router.get ('/', (req,res) => {
    try {
        res.json({ items: ITEMS})
      } catch(err){
        return next(err)
    }
})


router.post ('/', (req,res) => {
    try {
        const newItem = { name: req.body.name, price: req.body.price}
        ITEMS.push(newItem)
        res.json({ added: newItem})
    } catch(err){
        return next(err)
    }

})


router.get ('/:name', (req,res) => {
    try {
        const item = ITEMS.find(i => i.name === req.params.name)
        if (item === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        res.json({ item })
      } catch(err){
        return next(err)
    }

})

router.patch ('/:name', (req,res) => {
    try {
        console.log(foundItem)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        foundItem.name = req.body.name
        foundItem.price = req.body.price
    
        res.json({ updated: foundItem})
      } catch(err){
        return next(err)
    }

})

router.delete ('/:name', (req,res) => {
    try {
        const foundItem = ITEMS.findIndex(i => i.name === req.params.name)
        if (foundItem === -1) {
            throw new ExpressError("Item not found", 404)
        }
    
        ITEMS.splice(foundItem, 1)
        res.json({ message: "Deleted"})
      } catch(err){
        return next(err)
    }

})

module.exports = router;
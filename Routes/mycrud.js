const express = require('express');
const router = express.Router();
const Crud = require('../models/Crud');

router.get('/', async (req, res) => {
    try {
        const posts = await Crud.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const crud = new Crud({
        name: req.body.name,
    });
    try {
        const savedCrud = await crud.save();
        res.json(savedCrud);
    } catch (err) {
        res.json({message: err})
    }
});

//how to properly delete and update from front end?



module.exports = router;
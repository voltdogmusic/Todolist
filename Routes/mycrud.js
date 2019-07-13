const express = require('express');
const router = express.Router();
const Crud = require('../models/Crud');

//currently these are being used to send in to/dos that aren't assoc with any user
//the schema only has one parameter the "name" parameter and its being used to holy the text value of a to/do
//this semi worked, because i could still look up ids but the complete boolean is missing


//GET/READ
router.get('/', async (req, res) => {
    try {
        const posts = await Crud.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

//POST/CREATE
router.post('/', async (req, res) => {
    const crud = new Crud({
        name: req.body.name
    });
    try {
        const savedCrud = await crud.save();
        res.json(savedCrud);
    } catch (err) {
        res.json({message: err})
    }
});

//UPDATE
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    console.log(id,update);

    Crud.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


//DELETE
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;

    console.log('id in backend delete', id);

    Crud.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


module.exports = router;
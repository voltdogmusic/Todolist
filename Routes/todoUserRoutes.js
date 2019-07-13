const express = require('express');
const router = express.Router();
const todoUser = require('../models/TodoUser');

//GET/READ
router.get('/', async (req, res) => {
    try {
        const allTodoUsers = await todoUser.find();
        res.json(allTodoUsers);
    } catch (err) {
        res.json({message: err});
    }
});

//POST/CREATE
router.post('/', async (req, res) => {
    const todoUserLocal = new todoUser({
        email: req.body.email,
        password:req.body.password,
        todos:req.body.todos
    });
    try {
        const savedTodoUser = await todoUserLocal.save();
        res.json(savedTodoUser);
    } catch (err) {
        res.json({message: err})
    }
});

//UPDATE - update a users Todos
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    console.log(id,update);

    todoUser.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


//DELETE - delete a users To/dos
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;

    console.log('id in backend delete', id);

    todoUser.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


module.exports = router;
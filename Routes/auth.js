const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get all users, this route should not be accessible to the client

router.get('/register', async (req, res) => {
    try {
        const posts = await User.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});


//post one user
router.post('/register', async (req, res) => {

    //validating the user information
    //this is causing an unhandled promise rejection
    const {error} = registerValidation(req.body)
        .catch((err) => console.log('Registration Failed'));
    if (error) {
        return res.status(400).send(res.send(error.details[0].message));
    }


    //checking if email already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (e) {
        res.status(400).send(e);
    }
});


//LOGIN
router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(res.send(error.details[0].message));
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email does not exist');
    }

    //check if pass is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        return res.status(400).send('Invalid Password');
    }

    //create and assign token

    try{
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token).status(200);

    }catch (e) {
        console.log(e)
    }

    //return res.status(200).send('Logged In!');

});


module.exports = router;
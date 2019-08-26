const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const cors = require('cors');
require('dotenv/config');
const app = express();

//Middlewares---
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());



//Require directs you to the folder and the URL within use is tacked onto the beginning of the final endpoint
app.use('/todoUser', require('./Routes/auth'));

//this should be replaced with the above user variant
// i am not using mycrud in this project, or in any of my projects I don't think
app.use('/mycrud', require('./Routes/mycrud'));

//app.use('/todoUser', require('./Routes/todoUserRoutes'));
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log('connected to db')
    }
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT);



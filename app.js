const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();

//Middlewares---
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Any URL with the first param is redirected to the second params folder, then the remaining URL sent in is used to find the final endpoint
//api/user/register = api/user redirects to Routes/auth then register is used to located the enpoint in that js file

//used to test get requests http://localhost:3002/posts
app.use('/posts', require('./Routes/posts'));

//this route is being used for api/user/login and api/user/register
app.use('/api/user', require('./Routes/auth'));

//making my own CRUD
app.use('/mycrud', require('./Routes/mycrud'));


mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log('connected to db')
    }
);

// const router = express.Router();
// app.use('/', router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT);



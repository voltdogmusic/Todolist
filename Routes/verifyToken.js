const jwt = require('jsonwebtoken');


//add this to routes that need to be protected, it is a middleware function
module.exports = function auth(req, res, next) {

    //verify if token exits
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    //if token exists, ensure validity
    //use the verified object (id) sent from JWT and assing it to the user
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (e) {
        return res.status(401).send('Invalid Token');
    }
};





//when the user logs in, they get a token
//you can add this function to any route to ensure that the user accessing it has a valid token
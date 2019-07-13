const Joi = require('@hapi/joi');
//using validation schemas created by hapi joi inside of our endpoint logic within auth, allows hapi joi to generate useful error messages you can access later on in the front end

//Reg validation, these are exported and used in auth.js
//these are created based on your needs ie: min length of email, if X field is needed
//here we have created a validation schema using @hapi/joi for registering a user and logging in a user

const registerValidation = (data) =>{

    // console.log(data);

    // let todoSchema = Joi.object().keys({
    //     id: Joi.string(),
    //     text: Joi.string(),
    //     complete: Joi.boolean()
    // });

    const schema = {
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        password: Joi.string()
            .min(2)
            .required()
    };

    // console.log(Joi.validate(data,schema));
    return Joi.validate(data,schema);
};


const loginValidation = (data) =>{
    //console.log(data);

    let todoSchema = Joi.object().keys({
        id: Joi.string(),
        text: Joi.string(),
        complete: Joi.boolean()
    });

    const schema = {
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        password: Joi.string()
            .min(2)
            .required()
    };

    //console.log(Joi.validate(data,schema));
    return Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


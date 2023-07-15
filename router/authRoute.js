const express = require('express');
const { signup,signin } = require('../controller/authController');

//exporting authRouter
const authRouter = express.Router();


authRouter.get('/signup', (req, res) => {
    res.render('signup');
});

//route has two parts, path and controller controller is the function that is executed when someone hit the route path
authRouter.post('/signup', signup);

authRouter.get('/signin', (req, res) => {
    res.render('signin');
})
authRouter.post('/signin', signin);

authRouter.get('/hero', (req, res) => {
    res.render('hero');
})



module.exports = authRouter;
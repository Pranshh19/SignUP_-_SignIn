const express = require('express');
const { signup,signin,getUser, logout } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');

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

authRouter.get('/hero', jwtAuth, (req, res) => {
    res.render('hero');
  });
  
authRouter.get('/logout', jwtAuth,logout);

// authRouter.get('/user',jwtAuth,getUser)
// authRouter.get('/logout',jwtAuth,logout)


module.exports = authRouter;
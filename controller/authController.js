const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
require('dotenv').config();


const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email"
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match"
    });
  }

  try {
    const userInfo = new userModel(req.body);
    const result = await userInfo.save();

    return res.redirect('/api/auth/signin'); 
    // return res.status(200).json({
    //   success: true,
    //   data: result
    // });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An account already exists with the provided email'
      });
    }

    return res.status(400).json({
      success: false,
      message: e.message
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const user = await userModel.findOne({ email }).select('+password');

    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    const token = user.jwtToken();
    user.password = undefined;

    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    };

    res.cookie("token", token, cookieOptions);
    return res.redirect('/api/auth/hero');
    // return res.status(200).json({
    //   success: true,
    //   data: user
    // });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    });
  }
};

module.exports = { signup, signin };

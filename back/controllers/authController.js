const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const prisma = require('../utils/prisma')

exports.login = async (req, res) => {

    const errors = validationResult(req);
      
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body
  
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ alert: { type: "Error", msg: "Email address or password not valid"} });
    }
  
    const accessToken = jwt.sign(
      {
        id: user.id,
        nombre: user.name,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "8h"
      }
    );
  
    return res.status(200).json({ alert: { type: "Successful", msg: "Welcome, verified account"}, accessToken });
  
  }

exports.checkToken = async (req, res) => {

    const user = req.user
  
    return res.status(200).json({user, alert: { type: "Successful", msg: "Welcome, verified account"} });

}
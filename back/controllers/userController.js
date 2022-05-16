const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const prisma = require('../utils/prisma')

exports.newUser = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body

  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (checkEmail) {
    return res.status(400).json({ alert: { type: "Error", msg: "This email already exists"} });
  }

  const hashPassword = bcrypt.hashSync(password, 10)

  try{
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      }
    })
    return res.status(200).json({ alert: { type: "Successful", msg: "Account successfully created"} });
  }catch(err){
    console.log("error creating account")
    return res.status(500).json({ alert: { type: "Error", msg: "Error creating account"} });
  }

};


const express = require("express");
const { body } = require('express-validator');


const router = express.Router(),
      userController = require("../controllers/userController");

router.post("/",    body('email').isEmail().normalizeEmail(),
                    body('name').not().isEmpty().trim().escape(),
                    body('password').not().isEmpty().trim().escape(),
                    userController.newUser
            );

module.exports = router;
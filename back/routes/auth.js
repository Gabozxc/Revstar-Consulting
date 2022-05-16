const express = require("express");
const { body } = require('express-validator');
const auth = require('../middlewares/auth');


const router = express.Router(),
      authController = require("../controllers/authController");


router.post("/", 
    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape(),
    authController.login
);

router.get("/", auth, authController.checkToken);

module.exports = router;
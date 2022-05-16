const express = require("express");
const auth = require('../middlewares/auth');

const router = express.Router(),
      articuloController = require("../controllers/articuloController");
      
router.get("/",  articuloController.getArticulos);
router.put("/",  auth, articuloController.updateArticulo);
router.delete("/", auth, articuloController.deleteArticulo)

module.exports = router;
const express = require("express");
const auth = require('../middlewares/auth');

const router = express.Router(),
      invoiceController = require("../controllers/invoiceController");

router.post("/",   auth, invoiceController.newInvoice );
router.put("/",    auth, invoiceController.updateInvoice);
router.delete("/", auth, invoiceController.deleteInvoice );
router.get("/",          invoiceController.getInvoices );


module.exports = router;
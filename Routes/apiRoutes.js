// server/routes/apiRoutes.js
const express = require("express");
const router = express.Router();
const apiController = require("../Controller/apiController");


//Routes


router.get("/", apiController.getMessage);
router.post("/data", apiController.postData);
router.post("/contact",apiController.contact);
router.get("/contact-submissions",apiController.contact_submissions);

module.exports = router;

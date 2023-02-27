const express = require("express")
const router = express.Router()
const controller = require("../controller/usercontroller")

//===========================Test Api=====================

router.get("/test-api", function(req, res){
    res.send("working is fine")
})


//==========================Api's===========================

router.post("/createUser", controller.createUser)
router.post("/login", controller.login)
router.post("/createProduct", controller.createProduct)
router.get("/getProduct", controller.getProduct)





module.exports = router
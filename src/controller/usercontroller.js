const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const moment = require("moment");
const jwt = require("jsonwebtoken");
const validator = require("validator");
function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  return re.test(str);
}
function checkname(str) {
  var re = /^[A-Za-z]*$/;
  return re.test(str);
}

//==============================createUser========================================//

async function createUser(req, res) {
  try {
    const Data = req.body;
    if (Object.keys(Data).length < 1) {
      return res.status(400).send({ status: false, msg: "Bad request" });
    }
    if (!Data.fname) {
      return res.status(400).send({ status: false, msg: "required fname" });
    }
    if (!checkname(Data.fname.trim())) {
      return res.status(400).send({status: false, msg: "fname should not contain any numbers",});
    }
    if (!Data.lname) {
      return res.status(400).send({ status: false, msg: "required lname" });
    }
    if (!checkname(Data.lname.trim())) {
      return res.status(400).send({status: false, msg: "lname should not contain any numbers",});
    }
    if (!Data.title) {
      return res.status(400).send({ status: false, msg: "required title" });
    }
    if (!["Mr", "Mrs", "Miss"].includes(Data.title.trim())) {
      return res.status(400).send({ status: false, msg: "required valid title" });
    }
    if (!validator.isEmail(Data.email.trim())) {
      return res.status(400).send({ status: false, msg: "required valid email" });
    }
    const findUserId = await userModel.find({ email: Data.email });
    if (findUserId.length > 0) {
      return res.status(400).send({ status: false, msg: "email is already taken" });
    }
    if (!Data.password) {
      return res.status(400).send({ status: false, msg: "required password" });
    }
    if (!checkPassword(Data.password.trim())) {
      return res.status(400).send({status: false,
        msg: "password should contain at least 1 lowercase, uppercase ,numeric alphabetical character and at least one special character and also The string must be eight characters or longer",});
    }
    const savedData = await userModel.create(Data);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}

//==============================login========================================//

async function login(req, res) {
  try {
    const data = req.body;
    if (Object.keys(data).length < 1) {
      return res.status(400).send({ status: false, msg: "required email and password" });
    }
    if (!data.email) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }
    if (!data.password) {
      return res.status(400).send({ status: false, msg: "password is required" });
    }

    const logined = await userModel.findOne(data);
    if (!logined) {
      return res.status(401).send({ status: false, msg: "email or password is wrong" });
    }
    const token = jwt.sign(
      {
        userId: logined._id.toString(),
        batch: "xyz",
      },
      "xyz-pltm"
    );
    return res.status(201).send({ status: true, data: token });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}

//==============================createproduct========================================//

async function createProduct(req, res) {
  try {
    const Data = req.body;
    if (!Data.title) {
      return res.status(400).send({ status: false, msg: "required title" });
    }
    if (!Data.body) {
      return res.status(400).send({ status: false, msg: "required body" });
    }
    if (!Data.category) {
      return res.status(400).send({ status: false, msg: "required category" });
    }
    if (Object.keys(Data).includes("isDeleted")) {
      if (Data.isDeleted === true || "true") {
        Data.deletedAt = moment().format();
      }
    }
    if (Object.keys(Data).includes("isPublished")) {
      if (Data.isPublished === true || "true") {
        Data.publishedAt = moment().format();
      }
    }
    const savedData = await productModel.create(Data);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}

//==============================getProduct========================================//

async function getProduct(req, res) {
  try {
    const Data = req.query;
    if (Object.keys(Data).includes("authorId")) {
      if (!Data.userId) {
        return res
          .status(400)
          .send({ status: false, msg: "required authorId" });
      }
    }
    if (Object.keys(Data).includes("category")) {
      if (!Data.category) {
        return res
          .status(400)
          .send({ status: false, msg: "required category" });
      }
    }
    if (Object.keys(Data).includes("tags")) {
      if (!Data.tags) {
        return res.status(400).send({ status: false, msg: "required tags" });
      }
    }
    if (Object.keys(Data).includes("subcategory")) {
      if (!Data.subcategory) {
        return res
          .status(400)
          .send({ status: false, msg: "required subcategory" });
      }
    }
    Data.isDeleted = false;
    Data.isPublished = true;
    const savedData = await productModel.find(Data);
    if (savedData.length === 0) {
      return res.status(404).send({ status: false, msg: "page not founded" });
    }
    return res.status(200).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}


module.exports = { createUser, login, createProduct, getProduct}

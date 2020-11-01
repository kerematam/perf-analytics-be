const bodyParser = require("body-parser");
const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const siteCtrl = require("./site.controller");

const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap

router.route("/").get(siteCtrl.list).post(siteCtrl.create);

router
  .route("/:siteId")
  .get(siteCtrl.get)
  //   .put(validate(paramValidation.updateUser), userCtrl.update)
  .delete(siteCtrl.remove);

router.param("siteId", siteCtrl.load);

module.exports = router;

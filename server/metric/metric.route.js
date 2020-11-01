const express = require("express");
const metricCtrl = require("./metric.controller");

const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap

router.route("/").get(metricCtrl.list).post(metricCtrl.post);

router.route("/stats").get(metricCtrl.listStats);

router.param("metricId", metricCtrl.load);

module.exports = router;

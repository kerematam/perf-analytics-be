const express = require("express");
const siteRoutes = require("./server/site/site.route");
const metricRoutes = require("./server/metric/metric.route");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/health-check", (req, res) => res.send("OK"));

siteRoutes.use("/:siteId/metrics", metricRoutes);

router.use("/sites", siteRoutes);

module.exports = router;

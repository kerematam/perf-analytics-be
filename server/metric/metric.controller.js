const { REQUESTED_RANGE_NOT_SATISFIABLE } = require("http-status");
const Metric = require("./metric.model");

/**
 * Load Metric and append to req.
 */
function load(req, res, next, id) {
  Metric.get(id)
    .then((metric) => {
      req.metric = metric; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.metric);
}


/**
 * Create new Metric
 * @property {string} req.body.Metricname - The Metricname of Metric.
 * @property {string} req.body.mobileNumber - The mobileNumber of Metric.
 * @returns {Metric}
 */
function post(req, res, next) {
  const metric = new Metric({
    site: req.params.siteId,
    ttfb: req.body.ttfb,
    fcp: req.body.fcp,
    docl: req.body.docl,
    doml: req.body.doml,
    wl: req.body.wl,
    resources: req.body.resources,
  });

  metric
    .save()
    .then((metric) => res.json(metric))
    .catch((e) => next(e));
}

/**
 * Get Metric list.
 * @property {number} req.query.skip - Number of Metrics to be skipped.
 * @property {number} req.query.limit - Limit number of Metrics to be returned.
 * @returns {Metric[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0, fromDate } = req.query;
  Metric.list({ siteId: req.params.siteId, limit, skip, fromDate })
    .then((Metrics) => res.json(Metrics))
    .catch((e) => next(e));
}

function listStats(req, res, next) {
  const { limit = 50, skip = 0, fromDate } = req.query;

  Metric.listStats({ siteId: req.params.siteId, limit, skip, fromDate })
    .then((Metrics) => res.json(Metrics))
    .catch((e) => next(e));
}

module.exports = { load, get, list, listStats, post };

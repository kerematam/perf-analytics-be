const { db } = require("./site.model");
const Site = require("./site.model");
const puppeteer = require("puppeteer");

/**
 * Load Site and append to req.
 */
function load(req, res, next, id) {
  Site.get(id)
    .then((site) => {
      req.site = site; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get Site
 * @returns {Site}
 */
function get(req, res) {
  return res.json(req.site);
}

/**
 * Create new Site
 * @property {string} req.body.Sitename - The Sitename of Site.
 * @property {string} req.body.mobileNumber - The mobileNumber of Site.
 * @returns {Site}
 */
function create(req, res, next) {
  const site = new Site({
    url: req.body.url,
  });
  site
    .save()
    .then((savedSite) => res.json(savedSite))
    .catch((e) => next(e));
}

/**
 * Update existing Site
 * @property {string} req.body.Sitename - The Sitename of Site.
 * @property {string} req.body.mobileNumber - The mobileNumber of Site.
 * @returns {Site}
 */
function update(req, res, next) {
  const Site = req.Site;
  Site.url = req.body.url;

  Site.save()
    .then((savedSite) => res.json(savedSite))
    .catch((e) => next(e));
}

/**
 * Get Site list.
 * @property {number} req.query.skip - Number of Sites to be skipped.
 * @property {number} req.query.limit - Limit number of Sites to be returned.
 * @returns {Site[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Site.list({ limit, skip })
    .then((Sites) => res.json(Sites))
    .catch((e) => next(e));
}

/**
 * Delete Site.
 * @returns {Site}
 */
function remove(req, res, next) {
  const site = req.site;
  site
    .remove()
    .then((deletedSite) => res.json(deletedSite))
    .catch((e) => next(e));
}

module.exports = { load, get, create, update, list, remove };

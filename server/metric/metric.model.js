const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const Schema = mongoose.Schema;

const MetricSchema = new mongoose.Schema({
  site: [{ type: Schema.Types.ObjectId, ref: "Site" }],
  ttfb: {
    type: Number,
  },
  fcp: {
    type: Number,
  },
  doml: {
    type: Number,
  },
  wl: {
    type: Number,
  },
  resources: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
MetricSchema.method({});

/**
 * Statics
 */
MetricSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((metric) => {
        if (metric) {
          return metric;
        }
        const err = new APIError("No such site exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List metric in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of metric to be skipped.
   * @param {number} limit - Limit number of metric to be returned.
   * @returns {Promise<User[]>}
   */
  list({ siteId, skip = 0, limit = 50, fromDate } = {}) {
    const query = {
      ...(fromDate && { createdAt: { $gte: fromDate } }),
      site: { $in: [siteId] },
    };

    return this.find(query)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * List metric in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of metric to be skipped.
   * @param {number} limit - Limit number of metric to be returned.
   * @returns {Promise<User[]>}
   */
  async listStats({ siteId, skip = 0, limit = 50, fromDate } = {}) {
    const query = {
      ...(fromDate && { createdAt: { $gte: new Date(fromDate) } }),
      site: { $in: [siteId] },
    };

    const res = await this.find(query)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();

    const statModel = {
      _id: [],
      doml: [],
      ttfb: [],
      fcp: [],
      wl: [],
      createdAt: [],
    };

    const formattedRes = res.reduce((acc, item) => {
      acc._id.unshift(item._id);
      acc.doml.unshift(item.doml);
      acc.wl.unshift(item.wl);
      acc.ttfb.unshift(item.ttfb);
      acc.fcp.unshift(item.fcp);
      acc.createdAt.unshift(item.createdAt);

      return acc;
    }, statModel);

    return formattedRes;
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model("Metric", MetricSchema);

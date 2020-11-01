const mongoose = require("mongoose");
const request = require("supertest-as-promised");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require("../../index");

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("## Site APIs", () => {
  let site = {
    url: "KK123",
  };

  describe("# POST /api/sites", () => {
    it("should create a new site", (done) => {
      request(app)
        .post("/api/sites")
        .send(site)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.url).to.equal(site.url);
          site = res.body;
          done();
        })
        .catch((err) => {
          console.log("err : ", err);
        });
    });
  });

  describe("# GET /api/sites/:siteId", () => {
    it("should get site details", (done) => {
      request(app)
        .get(`/api/sites/${site._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.url).to.equal(site.url);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when site does not exists", (done) => {
      request(app)
        .get("/api/sites/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/sites/", () => {
    it("should get all sites", (done) => {
      request(app)
        .get("/api/sites")
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all sites (with limit and skip)", (done) => {
      request(app)
        .get("/api/sites")
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/sites/", () => {
    it("should delete site", (done) => {
      request(app)
        .delete(`/api/sites/${site._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.url).to.equal(site.url);
          done();
        })
        .catch(done);
    });
  });
});
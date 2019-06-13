const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const apiGateway = require('../src/routes/api-gateway');

describe('Suite', function() {
    describe('Inner Test Suite1', function () {
      it('should do something when some condition is met', function () {
      });
    });

    describe('POST /createAccount', function () {
        let data = { name: "user1", email: "user1@ey.com", password: "pass" };
        it('should create an account', function (done) {
            request(apiGateway)
                .post('/createAccount')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

});
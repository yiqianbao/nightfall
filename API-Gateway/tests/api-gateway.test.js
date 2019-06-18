const chai = require('chai');
const {expect,should} = chai;
const request = require('supertest');
const {aliceDetails, bobDetails, domainName} = require('./testData');

describe('Suite for API-Gateway', function() {

    describe('POST /createAccount', function () {
        it('should create an account for Alice', function (done) {
            request(domainName)
                .post('/createAccount')
                .send(aliceDetails)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
        it('should create an account for Bob', function (done) {
            request(domainName)
                .post('/createAccount')
                .send(bobDetails)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /login', function () {
        it('should login to Alice\'s account', function (done) {
            request(domainName)
                .post('/login')
                .send(bobDetails)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    let body = resp.body.data;
                    let token = body.token;
                    expect(body).to.have.own.property('token').that.is.a('string');
                    expect(token).that.is.not.empty;
                    done();
                });
        });

        it('should login to Bob\'s account', function (done) {
            request(domainName)
                .post('/login')
                .send(bobDetails)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    let body = resp.body.data;
                    let token = body.token;
                    expect(body).to.have.own.property('token').that.is.a('string');
                    expect(token).that.is.not.empty;
                    done();
                });
        });
    });

});
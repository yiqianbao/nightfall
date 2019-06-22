const chai = require('chai');
const {expect,should} = chai;
const request = require('supertest');
const {aliceDetails, bobDetails, domainName, ft} = require('./testData');

let aliceToken = null;

describe('Suite for ERC-20 Tokens', function() {

  before((done) => {
    /**
    * Login woth Alice's account
    */
    let promise1 = request(domainName)
      .post('/login')
      .send(aliceDetails)
      .set('Accept', 'application/json');
    /**
    * Set account tokens. 
    * */    
    Promise.all([promise1]).then(function(resp){
      let aliceRes = resp[0];
      let aliceBody = aliceRes.body.data;
      aliceToken = aliceBody.token;
      done();
    })   
  });

  describe('POST /ft/mint', function () {

    it('should Mint 1000 ERC20 Token for Alice', function (done) {
      let body = {
        "amount": ft.mintAmount
      };
      request(domainName)
      .post('/ft/mint')
        .send(body)
        .set('Accept', 'application/json')
        .set('Authorization', aliceToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('POST /ft/transfer', function () {
    it('should transfer 100 ERC20 token from Alice to Bob', function (done) {
      let body = {
        "amount": ft.transferAmount,
        "receiver_name": bobDetails.name
      };
      request(domainName)
        .post('/ft/transfer')
        .send(body)
        .set('Accept', 'application/json')
        .set('Authorization', aliceToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /ft/burn', function () {
    it('should burn 50 ERC20 token from Alice \'s account', function (done) {
      let body = {
        "amount": ft.burnAmount
      };
      request(domainName)
        .post('/ft/burn')
        .send(body)
        .set('Accept', 'application/json')
        .set('Authorization', aliceToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('GET /zkp/address/coin', function () {
    it('should get ERC20 token balance of Alice \'s account', function (done) {
      request(domainName)
        .get('/zkp/address/coin')
        .set('Accept', 'application/json')
        .set('Authorization', aliceToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {
          if (err) return done(err);
          expect(parseInt(resp.body.data.balance)).to.be.above(1);
          done();
        });
    });
  });
});

const chai = require('chai');
const {expect} = chai;
const request = require('supertest');
let {aliceDetails, bobDetails, domainName} = require('./testData');

describe('Suite for shield contract', function() {

  before((done) =>{
    /**
    * Login to Alice account
    */
    let aliceAuth = request(domainName)
      .post('/login')
      .send(aliceDetails)
      .set('Accept', 'application/json');
    /**
    * Login to Bob account
    */    
    let bobAuth = request(domainName)
      .post('/login')
      .send(bobDetails)
      .set('Accept', 'application/json');   
    /**
    * Set account tokens. 
    * */    
    Promise.all([aliceAuth, bobAuth]).then(async (resp) =>{
      let aliceRes = resp[0];
      let bobRes = resp[1];
      let aliceBody = aliceRes.body.data;
      let bobBody = bobRes.body.data;
      Object.assign(aliceDetails,{pk: aliceBody.publickey, sk: aliceBody.secretkey, token: aliceBody.token, address: aliceBody.address});
      Object.assign(bobDetails,{pk: bobBody.publickey, sk: bobBody.secretkey, token: bobBody.token, address: bobBody.address});
      done();
    });
  });

  describe('GET /shield/address', function () { 
    it(`should get the shield contract address of Alice`, function (done) {
      request(domainName)
        .get('/shield/address')
        .set('Accept', 'application/json')
        .set('Authorization', aliceDetails.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

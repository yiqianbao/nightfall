const chai = require('chai');
const {expect} = chai;
const request = require('supertest');
const {generateRandomSerial, convertToHex, getBalance} = require('./utils');
let {aliceDetails, bobDetails, domainName, ft, ft_commitment} = require('./testData');
let contractDetails = {};

describe('Suite for Nightfall Users', function() {

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
      let contract = await request(domainName)
        .get('/shield/address')
        .set('Accept', 'application/json')
        .set('Authorization', aliceDetails.token);
      contractDetails = contract.body.data;
      debugger;
      done();
    });

  });

  describe('POST /user/contractAddress', function () {

    it(`should add ERC721 shield contract address for Alice account`, function (done) {
      let body = {
        contractAddress : contractDetails.tokenShield.contract_address,
        contractName: "TestEYToken"
      };
      request(domainName)
        .post('/user/contractAddress')
        .send(body)
        .set('Accept', 'application/json')
        .set('Authorization', aliceDetails.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('PUT /user/contractAddress', function () { 
    it(`should update ERC721 shield contract address of Alice account`, function (done) {
      this.timeout(500000);
      let body = {
        "tokenShield": {
          "contractAddress": contractDetails.tokenShield.contract_address,
          "contractName": "TestToken",
          "isSelected": true
        }
      };
      request(domainName)
        .put('/user/contractAddress')
        .send(body)
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


  describe('DELETE /user/contractAddress', function () {
    it('should delete ERC721 contract shield address of Alice account', function (done) {
      request(domainName)
        .delete(`/user/contractAddress?token_shield=${contractDetails.tokenShield.contract_address}`)
        .set('Accept', 'application/json')
        .set('Authorization', aliceDetails.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

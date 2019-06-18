const chai = require('chai');
const { expect, should } = chai;
const request = require('supertest');

const { aliceDetails, bobDetails, domainName, nft } = require('./testData');

const alice = {
  token: null,
  sk: null,
};
const bob = {
  token: null,
  sk: null,
};
const tokenInfo = {
  uri: nft.tokenUriOne,
  id: `0x${(Math.random() * 1000000000000000000000000000000e46).toString(16)}`,
  salt: global.generateRandomSerial(),
  commitment: null, // will get set once token mint is done
  commitmentIndex: null, // will get set once token mint is done
  transferSalt: global.generateRandomSerial(),
  transferCommitment: null, // will get set once token transfer is done
  transferCommitmentIndex: null, // will get set once token transfer is done
}



describe('Suite for ERC-721 Commitments', function () {
	before(async function () {
    /**
     * Login Alice
     */
    const aliceData = await request(domainName)
      .post('/login')
      .send(aliceDetails)
      .set('Accept', 'application/json');

    /**
     * Login bob
     */
    const bobData = await request(domainName)
      .post('/login')
      .send(bobDetails)
      .set('Accept', 'application/json');

    // Set account tokens. 
    alice.token = aliceData.body.data.token; 
    bob.token = bobData.body.data.token;

    //get and store Users secret key.
    alice.sk = aliceData.body.data.secretkey;
    bob.sk = bobData.body.data.secretkey;
    /**
     * mint ERC-721 (EYToken)
     */
    const erc721Token = await request(domainName)
      .post('/nft/mint')
      .send({
        tokenURI: tokenInfo.uri,
        tokenID: tokenInfo.id,
      })
      .set('Accept', 'application/json')
      .set('Authorization', alice.token);
  });


  
  describe('POST /token/mint', function () {
    it(`should shield ${tokenInfo.uri} ERC721 Token for Alice`, function (done) {
      request(domainName)
        .post('/token/mint')
        .send({
          uri: tokenInfo.uri,
          tokenID: tokenInfo.id,
          S_A: tokenInfo.salt,
        })
        .set('Accept', 'application/json')
        .set('Authorization', alice.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, {body}) => {
          if (err) return done(err);
          expect(body.data).to.have.property('z_A');
          expect(body.data).to.have.property('z_A_index');

          tokenInfo.commitment = body.data.z_A;
          tokenInfo.commitmentIndex = `${parseInt(body.data.z_A_index, 16)}`;
          done();
        });
    });
  });



  describe('POST /token/transfer', function () {
    it(`should transfer shielded ${tokenInfo.uri} ERC721 Token from Alice to Bob`, function (done) {
      this.timeout(200000);
      request(domainName)
        .post('/token/transfer')
        .send({
          A: tokenInfo.id,
          uri: tokenInfo.uri,
          S_A: tokenInfo.salt,
          S_B: tokenInfo.transferSalt,
          sk_A: alice.sk,
          z_A: tokenInfo.commitment,
          receiver_name: 'bob',
          z_A_index: tokenInfo.commitmentIndex,
        })
        .set('Accept', 'application/json')
        .set('Authorization', alice.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, {body}) => {
          if (err) return done(err);
          expect(body.data).to.have.property('z_B');
          expect(body.data).to.have.property('z_B_index');

          tokenInfo.transferCommitment = body.data.z_B;
          tokenInfo.transferCommitmentIndex = `${parseInt(body.data.z_B_index, 16)}`;
          done();
        });
    });
  });



  describe('POST /token/burn', function () {
    before(function (done) {
      setTimeout(done, 10000);
    });
    it(`should burn shielded ${tokenInfo.uri} ERC721 Token from bob`, function (done) {
      this.timeout(200000);
      request(domainName)
        .post('/token/burn')
        .send({
          A: tokenInfo.id,
          uri: tokenInfo.uri,
          S_A: tokenInfo.transferSalt,
          Sk_A: bob.sk,
          z_A: tokenInfo.transferCommitment,
          z_A_index: tokenInfo.transferCommitmentIndex,
        })
        .set('Accept', 'application/json')
        .set('Authorization', bob.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, {body}) => {
          if (err) return done(err);
          expect(body.data).to.have.property('message');
          expect(body.data.message).to.equal('burn successful');
          done();
        });
    });
  });
});

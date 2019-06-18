const chai = require('chai');
const {expect,should} = chai;
const request = require('supertest');
const {aliceDetails, bobDetails, domainName, nft} = require('./testData');

let aliceToken= null;

const tokenIdOne =  `0x${(Math.random() * 1000000000000000000000000000000e46).toString(16)}`;
const tokenIdTwo = `0x${(Math.random() * 1000000000000000000000000000000e46).toString(16)}`;
const tokenIdThree = `0x${(Math.random() * 1000000000000000000000000000000e46).toString(16)}`;

describe('Suite for ERC-721 Tokens', function() {
     
    beforeEach((done) => {
        /**
         * Login woth Alice's account
         */
        let promise= request(domainName)
            .post('/login')
            .send(aliceDetails)
            .set('Accept', 'application/json');
        /**
         * Set account tokens. 
         * */    
        Promise.all([promise]).then(function(resp){
            let aliceRes = resp[0];
            let aliceBody = aliceRes.body.data;
            aliceToken = aliceBody.token;
            done();
        })   
    });

    describe('POST /nft/mint', function () {

        it('should Mint Widget01 ERC721 Token for Alice', function (done) {
            let body = {
                tokenURI: nft.tokenUriOne,
                tokenID: tokenIdOne
            };
            request(domainName)
                .post('/nft/mint')
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

        it('should Mint Widget02 ERC721 Token for Alice', function (done) {
            let body = {
                tokenURI: nft.tokenUriTwo,
                tokenID: tokenIdTwo
            };
            request(domainName)
                .post('/nft/mint')
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


        it('should Mint Widget03 ERC721 Token for Alice', function (done) {
            let body = {
                tokenURI: nft.tokenUriThree,
                tokenID: tokenIdThree
            };
            request(domainName)
                .post('/nft/mint')
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

    describe('POST /nft/transfer', function () {
        it('should transfer widget01 ERC721 token from Alice to Bob', function (done) {
            let body = {
               tokenID: tokenIdOne,
               uri: nft.tokenUriOne,
               receiver_name: bobDetails.name
            };
            request(domainName)
                .post('/nft/transfer')
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

    describe('POST /nft/burn', function () {
        it('should burn widget02 ERC721 token from Alice \'s account', function (done) {
            let body = {
                tokenID: tokenIdTwo,
                uri: nft.tokenUriTwo
             };
            request(domainName)
                .post('/nft/burn')
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


    describe('GET /nft', function () {
        it('should get list of ERC721 tokens of Alice account', function (done) {
            request(domainName)
                .get('/nft')
                .set('Accept', 'application/json')
                .set('Authorization', aliceToken)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    expect(resp.body.data).to.have.lengthOf.above(1);
                    done();
                });
        });
    });

});
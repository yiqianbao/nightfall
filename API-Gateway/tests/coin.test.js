const chai = require('chai');
const {expect} = chai;
const request = require('supertest');
const {generateRandomSerial, convertToNumber, convertToHex, getBalance} = require('./utils');
let {aliceDetails, bobDetails, domainName, ft, ft_commitment} = require('./testData');
let coinOne = {}; 
let coinTwo = {}; 
let changeToken = {};

describe('Suite for ERC-20 Token Commitments', function() {
     
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
            Object.assign(aliceDetails,{pk: aliceBody.publickey, sk: aliceBody.secretkey, token: aliceBody.token});
            Object.assign(bobDetails,{pk: bobBody.publickey, sk: bobBody.secretkey, token: bobBody.token});
            await request(domainName)
                .post('/ft/mint')
                .send({amount:ft.mintAmount})
                .set('Accept', 'application/json')
                .set('Authorization', aliceDetails.token);
            done();
        });

    });

    describe('POST /coin/mint', function () {

        it(`should Mint ERC20 Token commitment of value ${ft_commitment.mintTokenOne} for Alice`, function (done) {
            let body = {
                 A: convertToHex(ft_commitment.mintTokenOne),
                 pk_A: aliceDetails.pk,
                 S_A: generateRandomSerial()
            };
            request(domainName)
                .post('/coin/mint')
                .send(body)
                .set('Accept', 'application/json')
                .set('Authorization', aliceDetails.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    coinOne = Object.assign({}, resp.body.data, body);
                    done();
                });
        });

        it(`should Mint ERC20 Token commitment of value ${ft_commitment.mintTokenTwo} for Alice`, function (done) {
            let body = {
                 A: convertToHex(ft_commitment.mintTokenTwo),
                 pk_A: aliceDetails.pk,
                 S_A: generateRandomSerial()
            };
            request(domainName)
                .post('/coin/mint')
                .send(body)
                .set('Accept', 'application/json')
                .set('Authorization', aliceDetails.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    coinTwo = {...resp.body.data, ...body};
                    done();
                });
        });

        
    });

    describe('POST /coin/transfer', function () { 
        it(`should transfer ERC20 token commitment of value ${ft_commitment.transferAmount} from Alice to Bob`, function (done) {
            this.timeout(500000);
            let body = {
               C: coinOne.A,
               D: coinTwo.A,
               E: convertToHex(ft_commitment.transferAmount),
               F: getBalance(coinOne.A, coinTwo.A, ft_commitment.transferAmount),
               S_C: coinOne.S_A,
               S_D: coinTwo.S_A,
               z_C_index: coinOne.coin_index,
               z_D_index: coinTwo.coin_index,
               S_E: generateRandomSerial(),
               S_F: generateRandomSerial(),
               sk_A: aliceDetails.sk,
               z_C: coinOne.coin,
               z_D: coinTwo.coin,
               pk_A: aliceDetails.pk,
               receiver_name: bobDetails.name,
               pk_B: bobDetails.pk
            };
            request(domainName)
                .post('/coin/transfer')
                .send(body)
                .set('Accept', 'application/json')
                .set('Authorization', aliceDetails.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, resp) => {
                    if (err) return done(err);
                    Object.assign(changeToken, resp.body.data, {S_F: body.S_F});
                    done();
                });
        });
    });

    describe('POST /coin/burn', function () {
        it(`should burn ERC20 token commitment from Alice \'s account`, function (done) {

            let body = {
                A: convertToHex(ft_commitment.burnAmount),
                sk_A: aliceDetails.sk,
                S_A: changeToken.S_F,
                pk_A: aliceDetails.pk,
                z_A_index: changeToken.z_F_index,
                z_A: changeToken.z_F
            };

            request(domainName)
                .post('/coin/burn')
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


    // describe('GET /nft', function () {
    //     it('should get list of ERC721 tokens of Alice account', function (done) {
    //         request(domainName)
    //             .get('/nft')
    //             .set('Accept', 'application/json')
    //             .set('Authorization', aliceToken)
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, resp) => {
    //                 if (err) return done(err);
    //                 expect(resp.body.data).to.have.lengthOf.above(1);
    //                 done();
    //             });
    //     });
    // });

});
const chai = require('chai');
const { expect } = chai;
const request = require('superagent');
const prefix = require('superagent-prefix');
const config = require('config');

const {
	alice,
	bob,
	erc721,
	erc721Commitment,
	erc20,
	erc20Commitments,
	erc20CommitmentToTransfer,
	erc20CommitmentChange,
} = require('./testData');

const apiServerURL = config.get("apiServerURL");


describe('****** Integration Test ******\n', function () {
	/*
	*	Step 1.
	*	This Suite will create Alice and Bob.
	*/
	describe('*** Create Users ***', function () {
		/*
		* Create account for Alice.
		*/
		it('Sign up Alice', function (done) {
      request
        .post('/createAccount')
        .use(prefix(apiServerURL))
        .send(alice)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.nested.property('body.data.name');
          done();
        });
    });
    /*
		* Create account for bob.
		*/
		it('Sign up Bob', function (done) {
      request
        .post('/createAccount')
        .use(prefix(apiServerURL))
        .send(bob)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.nested.property('body.data.name');
          done();
        });
    });
	});
	/*
	* Step 2.
	* This Suite will login Alice and Bob/
	*/
	describe('*** Login Users ***', function () {
		/*
		* Login User Alice.
		*/
		it('Sign in Alice', function (done) {
			request
        .post('/login')
        .use(prefix(apiServerURL))
        .send(alice)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.nested.property('body.data.token');

          alice.token = res.body.data.token;
          alice.sk = res.body.data.secretkey;
          done();
        });
		});
		/*
		* Login User Bob.
		*/
		it('Sign in Bob', function (done) {
			request
        .post('/login')
        .use(prefix(apiServerURL))
        .send(bob)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.nested.property('body.data.token');

          bob.token = res.body.data.token;
          bob.sk = res.body.data.secretkey;
          done();
        });
		});
	});
	/*
	* Step 3 to 8.
	* This Suite will test ERC-721 & ERC-721 commitment
	* Mint, Transfer and Burn features.
	* Story line:
	*  Alice minted a ERC-721 token. She then Shield(mint ERC-721 commitment) that token
	*  and transfer to Bob. He then burns received ERC-721 commitment,
	*  and then transferred resultant ERC-721 token to Alice.
	* finally, Alice burns received ERC-721 token
	*/
	describe('*** ERC-721 and ERC-721 Commitment ***', function () {
		context('Alice\'s tasks: ', function () {
			/*
			* Step 3.
			* Mint ERC-721 Token.
			*/
			it('Mint ERC-721 token', function (done) {
				request
	        .post('/nft/mint')
	        .use(prefix(apiServerURL))
	        .send(erc721)
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('NFT Mint Successful');
		        done();
	        });
			});
			/*
			* Step 4.
			* Mint ERC-721 token commitment.
			*/
			it('Mint ERC-721 token commitment', function (done) {
				request
	        .post('/token/mint')
	        .use(prefix(apiServerURL))
	        .send(erc721Commitment)
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
						expect(res).to.have.nested.property('body.data.z_A');
						expect(res).to.have.nested.property('body.data.z_A_index');

						erc721Commitment.commitment = res.body.data.z_A;
          	erc721Commitment.commitmentIndex = `${parseInt(res.body.data.z_A_index, 16)}`;
		        done();
	        });
			});
			/*
			* Step 5.
			* Transfer ERC-721 Commitment.
			*/
			it('Transfer ERC-721 Commitment to Bob', function (done) {
				request
	        .post('/token/transfer')
	        .use(prefix(apiServerURL))
	        .send({
	        	A: erc721Commitment.tokenID,
	          uri: erc721Commitment.uri,
	          S_A: erc721Commitment.S_A,
	          S_B: erc721Commitment.S_B,
	          sk_A: alice.sk,
	          z_A: erc721Commitment.commitment,
	          receiver_name: bob.name,
	          z_A_index: erc721Commitment.commitmentIndex,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
						expect(res).to.have.nested.property('body.data.z_B');
						expect(res).to.have.nested.property('body.data.z_B_index');

						erc721Commitment.transferCommitment = res.body.data.z_B;
          	erc721Commitment.transferCommitmentIndex = `${parseInt(res.body.data.z_B_index, 16)}`;
		        done();
	        });
			});
		});
		context('Bob\'s tasks: ', function () {
			/*
			* This act as a delay.
			* Which is needed, presuming till then transfree Whisper will able receive transferred data.
			*/
			before((done) => setTimeout(done, 10000));
			/*
			* Step 6.
			* Burn ERC-721 Commitment.
			*/
			it("Burn ERC-721 Commitment", function (done) {
				request
	        .post('/token/burn')
	        .use(prefix(apiServerURL))
	        .send({
	        	A: erc721Commitment.tokenID,
	          uri: erc721Commitment.uri,
	          S_A: erc721Commitment.S_B,
	          Sk_A: bob.sk,
	          z_A: erc721Commitment.transferCommitment,
	          z_A_index: erc721Commitment.transferCommitmentIndex,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', bob.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
          	expect(res.body.data.message).to.equal('burn successful');

		        done();
	        });
			});
			/*
			* Step 7.
			* Tranfer ERC-721 Token.
			*/
			it("Transfer ERC-721 token to Alice", function (done) {
				request
	        .post('/nft/transfer')
	        .use(prefix(apiServerURL))
	        .send({
	        	tokenID: erc721.tokenID,
		        uri: erc721.tokenURI,
		        receiver_name: alice.name,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', bob.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('NFT Transfer Successful');
		        done();
	        });
			});
		});
		context('Alice\'s tasks: ', function () {
			/*
			* This act as a delay.
			* Which is needed, presuming till then transfree Whisper will able receive transferred data.
			*/
			before((done) => setTimeout(done, 10000));
			/*
			* Step 8.
			* Burn ERC-721 Token.
			*/
			it('Burn ERC-721 token', function (done) {
				request
	        .post('/nft/burn')
	        .use(prefix(apiServerURL))
	        .send({
	        	tokenID: erc721.tokenID,
		        uri: erc721.tokenURI,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('NFT Burn Successful');
		        done();
	        });
			});
		});
	});
	/*
	* Step 9 to 16.
	* This Suite will test ERC-20 & ERC-20 commitment
	* Mint, Transfer and Burn features.
	* Story line:
	*  Alice minted a 5 ERC-20 token. She then Shield(mint ERC-20 commitment) two token with value 2 and 3
	*  and transfer 4 token to Bob. He then burns received ERC-20 commitment,
	*  and then transferred resultant  4 ERC-20 token to Alice.
	* finally, Alice burns her received and change, 5 ERC-20 token
	*/
	describe('*** ERC-20 and ERC-20 Commitment ***', function () {
		context('Alice\'s tasks: ', function () {
			/*
			* Step 9.
			* Mint ERC-20 token,
			*/
			it(`Mint ${erc20.mint} ERC-20 tokens`, function (done) {
				request
	        .post('/ft/mint')
	        .use(prefix(apiServerURL))
	        .send({
	        	amount: erc20.mint
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('Mint Successful');
		        done();
	        });
			});
			/*
			* Step 10.
			* Mint ERC-20 token commitment.
			*/
			it(`Mint ${erc20.tobeShield[0]} ERC-20 token commitment`, function (done) {
				request
	        .post('/coin/mint')
	        .use(prefix(apiServerURL))
	        .send(erc20Commitments[0])
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.coin');
						expect(res).to.have.nested.property('body.data.coin_index');

						erc20Commitments[0].commitment = res.body.data.coin;
          	erc20Commitments[0].commitmentIndex = `${parseInt(res.body.data.coin_index, 16)}`;
		        done();
	        });
			});
			/*
			* Step 11.
			* Mint ERC-20 token commitment.
			*/
			it(`Mint ${erc20.tobeShield[1]} ERC-20 token commitment`, function (done) {
				request
	        .post('/coin/mint')
	        .use(prefix(apiServerURL))
	        .send(erc20Commitments[1])
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.coin');
						expect(res).to.have.nested.property('body.data.coin_index');

						erc20Commitments[1].commitment = res.body.data.coin;
          	erc20Commitments[1].commitmentIndex = `${parseInt(res.body.data.coin_index, 16)}`;
		        done();
	        });
			});
			/*
			* Step 12.
			* Transfer ERC-20 Commitment.
			*/
			it(`Transfer ${erc20.transfer} ERC-20 Commitment to Bob`, function (done) {
				const [C, S_C, z_C, z_C_index] = Object.values(erc20Commitments[0]);
				const [D, S_D, z_D, z_D_index] = Object.values(erc20Commitments[1]);
				const [E, S_E] = Object.values(erc20CommitmentToTransfer)
				const [F, S_F] = Object.values(erc20CommitmentChange)
				request
	        .post('/coin/transfer')
	        .use(prefix(apiServerURL))
	        .send({
	        	C, S_C, z_C, z_C_index,
	        	D, S_D, z_D, z_D_index,
	        	E, S_E,
	        	F, S_F,
		        sk_A: alice.sk,
		        receiver_name: bob.name,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.z_E');
						expect(res).to.have.nested.property('body.data.z_E_index');
						expect(res).to.have.nested.property('body.data.z_F');
						expect(res).to.have.nested.property('body.data.z_F_index');

						erc20CommitmentToTransfer.commitment = res.body.data.z_E;
          	erc20CommitmentToTransfer.commitmentIndex = `${parseInt(res.body.data.z_E_index, 16)}`;
          	erc20CommitmentChange.commitment = res.body.data.z_F;
          	erc20CommitmentChange.commitmentIndex = `${parseInt(res.body.data.z_F_index, 16)}`;
		        done();
	        });
			});
			/*
			* Step 13.
			* Burn ERC-20 Commitment.
			*/
			it(`Burn ${erc20.change} ERC-20 Commitment`, function (done) {
				if (!erc20.change) this.skip();
				request
	        .post('/coin/burn')
	        .use(prefix(apiServerURL))
	        .send({
	        	A: erc20CommitmentChange.value,
		        sk_A: alice.sk,
		        S_A: erc20CommitmentChange.S_F,
		        z_A_index: erc20CommitmentChange.commitmentIndex,
		        z_A: erc20CommitmentChange.commitment
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.z_C');
						expect(res).to.have.nested.property('body.data.z_C_index');
		        done();
	        });
			});
		});
		context('Bob\'s tasks: ', function () {
			/*
			* This act as a delay.
			* Which is needed, presuming till then transfree Whisper will able receive transferred data.
			*/
			before((done) => setTimeout(done, 10000));
			/*
			* Step 14.
			* Burn ERC-20 Commitment.
			*/
			it(`Burn ${erc20.transfer} ERC-20 Commitment`, function (done) {
				request
	        .post('/coin/burn')
	        .use(prefix(apiServerURL))
	        .send({
	        	A: erc20CommitmentToTransfer.value,
		        sk_A: bob.sk,
		        S_A: erc20CommitmentToTransfer.S_E,
		        z_A_index: erc20CommitmentToTransfer.commitmentIndex,
		        z_A: erc20CommitmentToTransfer.commitment
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', bob.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.z_C');
						expect(res).to.have.nested.property('body.data.z_C_index');
		        done();
	        });
			});
			/*
			* Step 15.
			* Transfer ERC-20 token
			*/
			it(`Transfer ${erc20.transfer} ERC-20 tokens to Alice`, function (done) {
				request
	        .post('/ft/transfer')
	        .use(prefix(apiServerURL))
	        .send({
	        	amount: erc20.transfer,
	        	receiver_name: alice.name,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', bob.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('transfer Successful');
		        done();
	        });
			});
		});
		context('Alice\'s tasks: ', function () {
			/*
			* This act as a delay.
			* Which is needed, presuming till then transfree Whisper will able receive transferred data.
			*/
			before((done) => setTimeout(done, 10000));
			/*
			* Step 16.
			* Burn ERC-20 Token.
			*/
			it(`Burn ${erc20.mint} ERC-20 tokens`, function (done) {
				request
	        .post('/ft/burn')
	        .use(prefix(apiServerURL))
	        .send({
	        	amount: erc20.mint,
	        })
	        .set('Accept', 'application/json')
	        .set('Authorization', alice.token)
	        .end((err, res) => {
		        if (err) return done(err);
		        expect(res).to.have.nested.property('body.data.message');
		        expect(res.body.data.message).to.be.equal('Burn Successful');
		        done();
	        });
			});
		});
	});
});

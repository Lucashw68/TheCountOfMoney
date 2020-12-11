//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');
let Crypto = require('../database/crypto');
const CryptoModel = Crypto.CryptoModel;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Cryptos', () => {
    beforeEach((done) => { //Before each test we empty the database
        CryptoModel.deleteMany({}, (err) => {
            done();
        });
    });
    /*
    * Test the GET /cryptos?cmids=BTC,ETH,RBX route
    */
    describe('/GET Cryptos', () => {
        it('it should GET all the cryptos', (done) => {
            chai.request(app)
                .get('/api/cryptos')
                // .send({ cmids: 'BTC,ETH'})
                .query({
                    cmids: 'BTC,ETH',
                 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });
    /*
    * Test the /GET route
    */
    describe('/GET Cryptos', () => {
        it('it should GET all the cryptos', (done) => {
            chai.request(app)
                .get('/api/cryptos/all')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('success');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
});
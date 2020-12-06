const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/crypto.controller');

// @desc    Get all cryptos entries in db
// @route   GET /cryptos/all
router.get('/all', cryptoController.getAllCryptos);

// @desc    Get list of cryptos by cmid. Ex: BTC,ETH,RBX
// @route   GET /cryptos?cmids=BTC,ETH,RBX
router.get('/', cryptoController.getAll);

// @desc    Get crypto by cmid. Ex: BTC
// @route   GET /cryptos/{:cmid}
router.get('/:cmid', cryptoController.getById);

// @desc    Get crypto by cmid and period
// @route   GET /cryptos/{:cmid}/history/{:period}
router.get('/:cmid/history/:period', cryptoController.getHistory);

// @desc    Create crypto entry in db
// @route   POST /cryptos
router.post('/', cryptoController.create);

// @desc    Delete crypto passed in route
// @route   DELETE /cryptos/{:cmid}
router.delete('/:cmid', cryptoController.delete);

module.exports = router;

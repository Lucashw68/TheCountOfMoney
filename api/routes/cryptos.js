const express = require('express');
const router = express.Router();
const token = require("../utils/token");
const cryptoController = require('../controllers/crypto.controller');

// @desc    Get all cryptos entries in db
// @route   GET /cryptos/all
router.get(
  '/all',
  [token.checkToken, token.isAdmin],
  cryptoController.getAllCryptos
);

// @desc    Get list of cryptos by cmid. Ex: BTC,ETH,RBX
// @route   GET /cryptos?cmids=BTC,ETH,RBX
router.get(
  '/', 
  cryptoController.getAll
);

// @desc    Get crypto by cmid. Ex: BTC
// @route   GET /cryptos/{:cmid}
router.get(
  '/:cmid',
  [token.checkToken],
  cryptoController.getById
);

// @desc    Get crypto by cmid and period
// @route   GET /cryptos/{:cmid}/history/{:period}
router.get(
  '/:cmid/history/:period',
  [token.checkToken],
  cryptoController.getHistory
);

// @desc    Create crypto entry in db
// @route   POST /cryptos
router.post(
  '/',
  [token.checkToken, token.isAdmin],
  cryptoController.create
);

// @desc    Delete crypto passed in route
// @route   DELETE /cryptos/{:cmid}
router.delete(
  '/:cmid',
  [token.checkToken, token.isAdmin],
  cryptoController.delete
);

module.exports = router;

const Crypto = require('../database/crypto');
const CryptoModel = Crypto.CryptoModel;
const apiService = require('../services/api.service');

// @desc    Get all cryptos entries in db
// @route   GET /cryptos/all
exports.getAllCryptos = (req, res) => {
    CryptoModel.find({}, (err, cryptos) => {
        return res.status(200).send(cryptos);
    });
};

// @desc    Get list of cryptos by cmid. Ex: BTC,ETH,RBX
// @route   GET /cryptos?cmids=BTC,ETH,RBX
exports.getAll = (req, res) => {
    const cryptosParam = req.query.cmids;
    if (!cryptosParam) return res.status(404).send({message: "Crypto with the code " + cryptosParam + " doesn't exists"});
    const cryptosCodes = cryptosParam.split(',');
    let resp = [];

    for (let i = 0; i != cryptosCodes.length; i++) {
        apiService.getAll(cryptosCodes[i]).then(data => {
            if (data) resp.push(data);
            if (i == cryptosCodes.length - 1) return res.status(200).send(resp);
        });
    }
};

// @desc    Get list of cryptos by cmid. Ex: BTC,ETH,RBX
// @route   GET /cryptos?cmids=BTC,ETH,RBX
exports.getPricesByCodes = (req, res) => {
    const cryptoCode = req.params.cmid;
    CryptoModel.findOne({ code: cryptoCode }, (err, crypto) => {
        if (!crypto) {
            return res.status(409).send({ message: "Crypto with the code " + cryptoCode + " doesn't exists." });
        } else {
            apiService.getPriceByCode(cryptoCode).then(prices => {
                const data = prices.data;
                if (prices.isAxiosError)
                    return res.status(400).send({ message: "Error connecrion with nomics API: " + prices.message });

                return res.status(200).send({ data });
            });
        }
    });
};

// @desc    Get crypto by cmid. Ex: BTC
// @route   GET /test/cryptos/{:cmid}
exports.getById = (req, res) => {
    const cryptoCode = req.params.cmid;
    CryptoModel.findOne({ code: cryptoCode }, (err, crypto) => {
        if (!crypto) {
            return res.status(404).send({ message: "Crypto with the code " + cryptoCode + " doesn't exists." });
        } else {
            apiService.getById(crypto).then(data => {
                const infos = data[0];
                const prices = data[1];
                if (!infos || !prices) {
                    return res.status(400).send({ message: "Error connection with api" });
                } else {
                    const infosData = infos.data[0];
                    const pricesData = prices.data[0];
                    return res.status(200).send({
                        "cmid": crypto.code,
                        "name": crypto.name,
                        "currentPrice": parseInt(infosData.price, 10),
                        "openingPrice": pricesData.price_open,
                        "lowestDay": pricesData.price_low,
                        "highestDay": pricesData.price_high,
                        "image": crypto.image
                    });
                }
            });
        }
    });
};

// @desc    Create crypto entry in db
// @route   POST /cryptos
exports.create = (req, res) => {
    if (!req.body.name
        || !req.body.code
        || !req.body.image) {
        return res.status(404).send({ message: "Content can not be empty." });
    }

    CryptoModel.findOne({ code: req.body.code }, (err, crypto) => {
        if (crypto) {
            return res.status(409).send({ message: "Crypto with the code " + req.body.code + " already exists." });
        } else {
            const crypto = new CryptoModel({
                name: req.body.name,
                code: req.body.code,
                image: req.body.image,
            });

            crypto.save((err, newCrypto) => {
                if (err) res.status(500).send({ message: "Error creating crypto." });
                return res.status(200).send({ message: "Crypto created sucessfully." });
            });
        }
    });
}

// @desc    Get crypto by cmid and period
// @route   GET /cryptos/{:cmid}/history/{:period}
exports.getHistory = (req, res) => {
    const code = req.params.cmid;
    const period = req.params.period;
    if (!code || !period) return res.status(400).send({ message: "Cmid and period are needed"});
    if (period !== "daily" && period !== "hourly" && period !== "minute") 
        return res.status(400).send({ message: "Period must be one of: daily, hourly or minute"});

    apiService.getHistory(code, period).then(history => {
        if (history.isAxiosError)
            return res.status(400).send({ message: "Error connection with API: " + history.message });

        return res.status(200).send(history.data);
    });
};

// @desc    Delete crypto passed in route
// @route   DELETE /cryptos/{:cmid}
exports.delete = (req, res) => {
    const codeParam = req.params.cmid
    CryptoModel.findOne({ code: codeParam }, (err, crypto) => {
        if (!crypto)
            return res.status(500).send({ message: "Crypto with the code " + codeParam + " was not found." });

        crypto.remove(() => {
            return res.status(200).send({ message: "Crypto deleted sucessfully." });
        });
    });
};

// // @desc    Get crypto by cmid and period
// // @route   GET /cryptos/{:cmid}/history/{:period}
// exports.getCryptoByPeriod = (req, res) => {
//   axios.get("https://api.coincap.io/v2/assets/" + req.params.cmid + "/history?interval=" + req.params.period)
//   .then(function(response) {
//     res.status(200);
//     res.json({data: response.data.data})
//   })
//   .catch(function(err) {
//     res.status(400);
//     res.json({ message: "Error with coincap API: " + err });
//   })
// }



            // let client = axios.create({
            //     baseURL: "https://api.nomics.com/v1",
            //     method: 'get',
            //     responseType: 'json',
            //     params: { 
            //         key: "70899bfac7ff094679ae52a8ae32ead9"
            //     }
            // });
            // // client('/prices')
            // client('/prices')
            //     .then(function(response) {
            //         res.status(200);
            //         res.json({data: response.data.data})
            //     })
            //     .catch(function(err) {
            //         res.status(400).send({ message: "Error with API: " + err });
            // })



// @desc    Get crypto by cmid. Ex: BTC
// @route   GET /cryptos/{:cmid}
// exports.getByCode = (req, res) => {
//     const cryptoCode = req.params.cmid;
//     CryptoModel.findOne({ code: cryptoCode }, (err, crypto) => {
//         if (!crypto) {
//             return res.status(409).send({ message: "Crypto with the code " + cryptoCode + " doesn't exists." });
//         } else {
//             apiService.getCryptoInfos(cryptoCode).then(infos => {
//                 if (infos.isAxiosError) {
//                     return res.status(400).send({ message: "Error connection with coinapi: " + infos.message });
//                 } else {
//                     apiService.getPriceByCode(cryptoCode).then(priceReq => {
//                         if (priceReq.isAxiosError) {
//                             return res.status(400).send({ message: "Error connection with nomics API: " + priceReq.message });
//                         } else {
//                             const data = infos.data[0];
//                             const priceData = priceReq.data[0];
//                             return res.status(200).send({
//                                 "cmid": crypto.code,
//                                 "name": crypto.name,
//                                 "currentPrice": parseInt(priceData.price, 10),
//                                 "openingPrice": data.price_open,
//                                 "lowestDay": data.price_low,
//                                 "highestDay": data.price_high,
//                                 "image": crypto.image
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// };
/************************************************************************
 *                                                                      *
 *                             CRYPTOS                                  *
 *                                                                      *
 * **********************************************************************/

const nomics = require('../config/nomics')
const axios = require('axios');

class NomicService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.nomics.com/v1',
      method: 'get',
      responseType: 'json',
      params: { key: nomics.api_key }
    });
  }

  async getPrices () {
    const res = await this.client('/prices');
    return res.data;
  }
}

module.exports.NomicService = NomicService;
/************************************************************************
 *                                                                      *
 *                             CRYPTOS                                  *
 *                                                                      *
 * **********************************************************************/

const nomics = require('../config/nomics')

 class Crypto {
   constructor(name) {
     this.name = name
   }

   get(params) {
     throw new Error('You must implement this function');
   }
 }

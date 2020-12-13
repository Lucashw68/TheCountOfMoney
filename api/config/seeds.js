module.exports = [
  {
    "model": "User",
    "documents": [
      {
        "username": "User",
        "email": "oui@test.fr",
        "password": "azertyuiop",
        "provider": "local",
        "preferences": {
          "currency": "EUR",
          "cryptos_list": [
            "BTC",
            "ETH",
            "XRP",
            "USDT",
            "BCH",
            "LTC",
            "LINK",
            "DOT",
            "ADA",
            "BNB",
            "XLM",
            "BSV",
            "USDC",
            "EOS",
            "XMR",
            "WBTC",
            "TRX",
            "XEM",
            "XTZ"
          ],
          "keywords_list": []
        }
      },
      {
        "username": "Admin",
        "email": "admin@test.fr",
        "password": "azertyuiop",
        "provider": "local",
        "role": "admin",
        "preferences": {
          "currency": "EUR",
          "cryptos_list": [
            "BTC",
            "ETH",
            "XRP",
            "USDT",
            "BCH",
            "LTC",
            "LINK",
            "DOT",
            "ADA",
            "BNB",
            "XLM",
            "BSV",
            "USDC",
            "EOS",
            "XMR",
            "WBTC",
            "TRX",
            "XEM",
            "XTZ"
          ],
          "keywords_list": []
        }
      }
    ]
  },
  {
    "model": "AppPreferences",
    "documents": [
      {
        "k": 5,
        "n": 5,
        "cryptos_list": [
          "BTC",
          "ETH",
          "XRP",
          "USDT",
          "BCH",
          "LTC",
          "LINK",
          "DOT",
          "ADA",
          "BNB",
          "XLM",
          "BSV",
          "USDC",
          "EOS",
          "XMR",
          "WBTC",
          "TRX",
          "XEM",
          "XTZ"
        ],
        "feeds_list": [
          "https://www.coindesk.com/feed",
          "https://news.bitcoin.com/feed/",
          "https://minergate.com/blog/feed/",
          "https://www.newsbtc.com/feed",
          "https://www.cryptoninjas.net/feed/",
          "https://medium.com/feed/the-capital",
          "https://www.financemagnates.com/cryptocurrency/feed/",
          "https://www.reddit.com/r/CryptoCurrency/top/.rss?format=xml",
          "https://www.etoro.com/blog/feed/"
        ]
      }
    ]
  }
];

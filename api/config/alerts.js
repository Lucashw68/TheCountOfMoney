module.exports = {
  refreshTime: 600000,

  // ===========================================================================
  // Alerts by services
  // ===========================================================================

  alerts: {

    // Email alerts

    "gmail": [
      {
        name: 'send_email',
        description: 'Send an email',
        params: [
          {
              name: "email",
              description: "The address to send to",
          },
          {
              name: "subject",
              description: "The subject of the email",
          },
          {
              name: "body",
              description: "The body of the email",
          }
        ]
      }
    ],

    // Twitter alerts

    "twitter": [
      {
        name: 'post_tweet',
        description: 'Post a tweet',
        params: [
          {
            name: "tweet_message",
            description: "Message to send",
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // Triggers
  // ===========================================================================

  triggers: {
    "datetime": {
      name: 'on_datetime',
      description: 'On a specific date and time',
      params: [
        {
          name: "month",
          description: "The month",
        },
        {
          name: "day",
          description: "The day",
        },
        {
          name: "hour",
          description: "The hour",
        },
        {
          name: "minute",
          description: "The minute",
        }
      ]
    },
    "currency": {
      name: 'on_currency_change',
      description: 'When a cryptocurrency value reach a specified value',
      params: [
        {
          name: 'cryptocurrency',
          description: 'The cryptocurrency to check'
        },
        {
          name: 'value',
          description: 'The boundary value'
        },
        {
          name: 'bound',
          description: 'The bound (> || <)'
        }
      ]
    }
  }

}

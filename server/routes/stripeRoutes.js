const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);

module.exports = (app) => {
  app.get('/api/stripe_payment', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: intent.client_secret });
  });
};

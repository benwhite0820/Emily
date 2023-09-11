const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/stripe_setup', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
      amount: 599,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: intent.client_secret });
  });

  app.post('/api/stripe_successful', requireLogin, async (req, res) => {
    if (req.body.paymentStatus !== 'succeeded')
      return res.status(401).send({ error: 'Payment fail! Try Again Later' });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};

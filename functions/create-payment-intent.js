require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const calculateOrderAmount = (totalAmount, shippingFee) => {
  return totalAmount + shippingFee;
};

exports.handler = async (event, context) => {
  if (event.body) {
    try {
      const { cart, totalAmount, shippingFee } = JSON.parse(event.body);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(totalAmount, shippingFee),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'create payment intent',
  };
};

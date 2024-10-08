// controllers/paymentController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.procesarPago = async (req, res) => {
  try {
    let { amount, currency, paymentMethodId } = req.body;
    currency = currency || 'USD';

    // Convertir monto a la unidad más pequeña de la moneda (por ejemplo, centavos)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json({ msg: 'Pago exitoso', paymentIntent });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(400).json({ msg: 'Error al procesar el pago', error: error.message });
  }
};

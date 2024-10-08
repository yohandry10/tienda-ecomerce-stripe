// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/create-payment-intent`,
        {
          amount: Math.round(totalPrice * 100), // Convertir a centavos
          currency: 'usd',
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error('Error en el pago:', result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Pago exitoso');
          // Aquí puedes crear la orden en el backend
        }
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos de dirección */}
      <TextField
        label={t('address')}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('city')}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('postal_code')}
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('country')}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <CardElement style={{ margin: '20px 0' }} />
      <Button type="submit" variant="contained" color="primary" disabled={!stripe || loading}>
        {loading ? t('processing') : t('place_order')}
      </Button>
    </form>
  );
}

function CheckoutPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h4">{t('checkout')}</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
}

export default CheckoutPage;

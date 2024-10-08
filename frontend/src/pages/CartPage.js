// src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { removeFromCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.precio * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4">{t('your_cart')}</Typography>
      {cartItems.length === 0 ? (
        <Typography>{t('cart_empty')}</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.product._id}>
              <ListItemText
                primary={item.product.nombre}
                secondary={`${t('price')}: ${item.product.precio} ${item.product.moneda}`}
              />
              <Typography>{t('quantity')}: {item.quantity}</Typography>
              <Button onClick={() => handleRemoveFromCart(item.product._id)}>
                {t('remove')}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h6">
        {t('total')}: {totalPrice.toFixed(2)} {cartItems[0]?.product.moneda || ''}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/checkout"
        disabled={cartItems.length === 0}
      >
        {t('proceed_to_checkout')}
      </Button>
    </Container>
  );
}

export default CartPage;

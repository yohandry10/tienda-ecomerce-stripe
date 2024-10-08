// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProfilePage() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/myorders`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        console.error('Error al obtener los pedidos del usuario:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4">{t('my_orders')}</Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order._id}>
            <ListItemText
              primary={`${t('order')} #${order._id}`}
              secondary={`${t('total')}: ${order.totalPrice} - ${t('status')}: ${
                order.isPaid ? t('paid') : t('pending')
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ProfilePage;

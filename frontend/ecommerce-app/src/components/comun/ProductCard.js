// src/components/common/ProductCard.js

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
  };

  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.imagen}
          alt={product.nombre}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.descripcion}
        </Typography>
        <Typography variant="h6">
          {t('price')}: {product.precio} {product.moneda}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          {t('add_to_cart')}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

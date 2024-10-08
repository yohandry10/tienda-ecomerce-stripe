// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../redux/actions/cartActions';

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
    setOpenSnackbar(true);
  };

  if (!product) return <div>{t('loading')}</div>;

  return (
    <Container>
      <Typography variant="h4">{product.name}</Typography>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: '100%', marginBottom: '1rem' }}
      />
      <Typography variant="h6">
        {t('price')}: {product.price} {product.currency}
      </Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="body1">
        {t('stock')}: {product.stock > 0 ? product.stock : t('out_of_stock')}
      </Typography>
      <TextField
        type="number"
        label={t('quantity')}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{ min: 1, max: product.stock }}
        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {t('add_to_cart')}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={t('product_added_to_cart')}
      />
    </Container>
  );
}

export default ProductDetailPage;

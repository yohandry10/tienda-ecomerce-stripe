// src/pages/CategoryPage.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/comun/ProductCard';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

function CategoryPage() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProducts(categoryName));
  }, [dispatch, categoryName]);

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {t(categoryName)}
      </Typography>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">
          {t('error')}: {error}
        </Typography>
      ) : products && products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>{t('no_products_found')}</Typography>
      )}
    </Container>
  );
}

export default CategoryPage;

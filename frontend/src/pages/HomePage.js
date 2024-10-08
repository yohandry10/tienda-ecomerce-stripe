// src/pages/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/comun/ProductCard';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/layout/HeroBanner';
import CategoryFilter from '../components/comun/CategoryFilter';

function HomePage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <HeroBanner />
      <Container sx={{ marginTop: '2rem' }}>
        <CategoryFilter />
        <Typography variant="h4" gutterBottom>
          {t('our_products')}
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
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>{t('no_products_found')}</Typography>
        )}
      </Container>
    </div>
  );
}

export default HomePage;

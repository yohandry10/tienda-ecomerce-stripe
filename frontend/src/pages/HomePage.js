// src/pages/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/comun/ProductCard';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/layout/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandsSection from '../components/home/BrandsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import './HomePage.css';

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

      {/* Sección de Productos Destacados */}
      <FeaturedProducts />

      {/* Sección de Marcas */}
      <BrandsSection />

      {/* Sección de Suscripción al Boletín */}
      <NewsletterSection />

      <Container className="mt-5">
        <h2 className="section-title">{t('our_products')}</h2>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-danger">
            {t('error')}: {error}
          </div>
        ) : products && products.length > 0 ? (
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <div>{t('no_products_found')}</div>
        )}
      </Container>
    </div>
  );
}

export default HomePage;

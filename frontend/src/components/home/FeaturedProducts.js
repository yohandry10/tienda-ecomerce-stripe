// src/components/home/FeaturedProducts.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../../redux/actions/productActions';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state) => state.product);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="featured-products my-5">
      <h2 className="section-title">{t('featured_products')}</h2>
      <Row className="justify-content-center">
        {featuredProducts.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link to={`/product/${product._id}`} className="featured-product-link">
              <div className="featured-product-card">
                <img src={product.imagen} alt={product.nombre} className="featured-product-image" />
                <h5 className="featured-product-name">{product.nombre}</h5>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FeaturedProducts;

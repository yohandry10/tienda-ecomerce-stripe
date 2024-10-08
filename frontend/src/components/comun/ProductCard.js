// src/components/common/ProductCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <Card.Img variant="top" src={product.imagen} alt={product.nombre} className="product-image" />
      </Link>
      <Card.Body>
        <Card.Title className="product-name">{product.nombre}</Card.Title>
        <Card.Text className="product-price">
          {t('price')}: {product.precio} {product.moneda}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart} className="add-to-cart-button">
          {t('add_to_cart')}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

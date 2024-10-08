// src/components/home/BrandsSection.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './BrandsSection.css';

function BrandsSection() {
  const brands = [
    { name: 'Brand 1', logo: '/images/brands/brand1.png' },
    { name: 'Brand 2', logo: '/images/brands/brand2.png' },
    { name: 'Brand 3', logo: '/images/brands/brand3.png' },
    { name: 'Brand 4', logo: '/images/brands/brand4.png' },
    { name: 'Brand 5', logo: '/images/brands/brand5.png' },
    { name: 'Brand 6', logo: '/images/brands/brand6.png' },
  ];

  return (
    <div className="brands-section my-5">
      <Container>
        <h2 className="section-title">Nuestras Marcas</h2>
        <Row className="justify-content-center align-items-center">
          {brands.map((brand, index) => (
            <Col key={index} xs={6} sm={4} md={2} className="text-center mb-4">
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default BrandsSection;

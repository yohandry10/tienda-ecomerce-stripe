// src/components/layout/Footer.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
            <h5 className="footer-brand">{t('store_name')}</h5>
            <p className="footer-text">
              {t('AndyDev')}
            </p>
          </Col>
          <Col md={6} className="text-md-end text-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="footer-copy">
              © {new Date().getFullYear()} {t('store_name')}. {t('all_rights_reserved')}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

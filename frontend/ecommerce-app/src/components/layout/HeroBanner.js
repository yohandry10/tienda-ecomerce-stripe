// src/components/layout/HeroBanner.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import './HeroBanner.css'; // Archivo CSS para estilos personalizados

function HeroBanner() {
  const { t } = useTranslation();

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center text-center">
      <div className="overlay"></div>
      <div className="container">
        <h1 className="display-4 text-white">{t('welcome')}</h1>
        <p className="lead text-white">{t('best_products')}</p>
        <a href="#products" className="btn btn-primary btn-lg">
          {t('shop_now')}
        </a>
      </div>
    </div>
  );
}

export default HeroBanner;

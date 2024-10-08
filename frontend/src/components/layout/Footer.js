// src/components/layout/Footer.js

import React from 'react';
import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Footer.css'; // Archivo CSS para estilos personalizados

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {t('footer_text')}
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;

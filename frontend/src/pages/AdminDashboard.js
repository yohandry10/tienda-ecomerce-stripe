// src/pages/AdminDashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h4">{t('admin_dashboard')}</Typography>
      {/* Aquí puedes añadir funcionalidades para administrar productos, órdenes, etc. */}
    </Container>
  );
}

export default AdminDashboard;

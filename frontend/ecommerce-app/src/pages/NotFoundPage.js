// src/pages/NotFoundPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h4">{t('page_not_found')}</Typography>
    </Container>
  );
}

export default NotFoundPage;

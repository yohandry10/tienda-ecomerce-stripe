// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">{t('login')}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={submitHandler}>
        <TextField
          label={t('email')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t('password')}
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {t('login')}
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          {t('no_account')} <Link to="/register">{t('register')}</Link>
        </Typography>
      </form>
    </Container>
  );
}

export default LoginPage;

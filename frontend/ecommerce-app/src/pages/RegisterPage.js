// src/pages/RegisterPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function RegisterPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
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
    dispatch(register(name, email, password));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">{t('register')}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={submitHandler}>
        <TextField
          label={t('name')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {t('register')}
        </Button>
      </form>
    </Container>
  );
}

export default RegisterPage;

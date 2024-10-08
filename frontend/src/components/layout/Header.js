// src/components/layout/Header.js

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  Select,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Language,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import './Header.css'; // Importar el archivo CSS

function Header() {
  const { t, i18n } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [currency, setCurrency] = useState('USD');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenuOpen = (event) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleLangMenuClose();
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    // Aquí puedes guardar la moneda en el estado global o en localStorage
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        {/* Logotipo o nombre de la tienda */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="store-name"
        >
          {t('store_name')}
        </Typography>
        {/* Espacio flexible para alinear a la derecha */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Selector de Moneda */}
        <Select
          value={currency}
          onChange={handleCurrencyChange}
          className="select"
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>
        {/* Iconos y menús */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Carrito */}
          <IconButton
            className="icon-button"
            component={Link}
            to="/cart"
          >
            <Badge
              badgeContent={cartItems.length}
              color="error"
              className="badge"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          {/* Usuario */}
          {userInfo ? (
            <>
              <IconButton
                className="icon-button"
                onClick={handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/profile">
                  {t('profile')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {t('logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              className="icon-button"
              component={Link}
              to="/login"
            >
              <AccountCircle />
            </IconButton>
          )}
          {/* Selector de idioma */}
          <IconButton
            className="icon-button language-icon"
            onClick={handleLangMenuOpen}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={handleLangMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange('es')}>
              Español
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>
              English
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

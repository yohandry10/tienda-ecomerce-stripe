// src/components/layout/Header.js

import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Header.css';

function Header() {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implementa la lógica de búsqueda según tus necesidades
    console.log('Buscar:', searchTerm);
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <Container>
          <p className="top-bar-text">
            ¡OFERTAS EXCLUSIVAS! {t('mega_discounts')}
          </p>
        </Container>
      </div>

      {/* Navbar Principal */}
      <Navbar expand="lg" className="navbar-main" variant="dark">
        <Container>
          {/* Logo */}
          <LinkContainer to="/">
            <Navbar.Brand className="store-name">{t('store_name')}</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Categorías */}
            <Nav className="me-auto">
              <NavDropdown title={t('categories')} id="basic-nav-dropdown" className="nav-dropdown">
                <LinkContainer to="/category/electronics">
                  <NavDropdown.Item>{t('electronics')}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/fashion">
                  <NavDropdown.Item>{t('fashion')}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/home">
                  <NavDropdown.Item>{t('home')}</NavDropdown.Item>
                </LinkContainer>
                {/* Añade más categorías según tus necesidades */}
              </NavDropdown>

              {/* Enlaces de navegación */}
              <LinkContainer to="/deals">
                <Nav.Link>{t('deals')}</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/orders">
                <Nav.Link>{t('my_orders')}</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/invite">
                <Nav.Link>{t('invite_and_earn')}</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/guarantee">
                <Nav.Link>{t('delivery_guarantee')}</Nav.Link>
              </LinkContainer>
            </Nav>

            {/* Buscador */}
            <Form className="d-flex me-3" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder={t('search_placeholder')}
                className="me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" type="submit">{t('search')}</Button>
            </Form>

            {/* Iconos y menús */}
            <Nav>
              {/* Carrito */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" className="ms-1">
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* Usuario */}
              {userInfo ? (
                <NavDropdown title={<FaUser />} id="username" align="end" className="user-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{t('my_account')}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>{t('logout')}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link><FaUser /> {t('login')}</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

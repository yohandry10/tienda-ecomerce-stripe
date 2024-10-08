// src/components/home/NewsletterSection.js

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './NewsletterSection.css';

function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Lógica para suscribir al usuario al boletín
    console.log('Suscribir:', email);
    setEmail('');
  };

  return (
    <div className="newsletter-section my-5">
      <Container className="text-center">
        <h2 className="section-title">Suscríbete a nuestro Boletín</h2>
        <p>Recibe las últimas ofertas y novedades directamente en tu correo.</p>
        <Form className="newsletter-form" onSubmit={handleSubscribe}>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="primary" type="submit">
            Suscribirse
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default NewsletterSection;

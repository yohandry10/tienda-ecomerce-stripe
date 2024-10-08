import React, { useEffect, useState } from 'react';
import './HeroBanner.css'; // Importar el archivo CSS con los estilos

function HeroBanner() {
  const [text, setText] = useState('');
  const fullText = 'Tienda Online';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (index < fullText.length) {
      interval = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 200); // Ajusta el tiempo de aparición de cada letra
    } else {
      interval = setTimeout(() => {
        setText(''); // Vacía el texto para reiniciar
        setIndex(0);
      }, 2000); // Espera 2 segundos antes de reiniciar el texto
    }
    return () => clearTimeout(interval);
  }, [index, fullText]);

  return (
    <div className="hero-banner">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{text}</h1>
      </div>
    </div>
  );
}

export default HeroBanner;

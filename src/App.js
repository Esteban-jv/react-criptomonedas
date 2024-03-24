import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem
`;

function App() {

  const [ moneda, setMoneda ] = useState('');
  const [ cripto, setCripto ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ cotizacion, setCotizacion ] = useState({});

  useEffect(() => {
    
    const cotizarCriptomoneda = async () => {
      //validar campos
      if(moneda === '' || cripto === '') return;
      //construir url
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      //spinner
      setLoading(true);
      //peticion
      const resultado = await axios.get(url);

      setTimeout(() => {
        setCotizacion(resultado.data.DISPLAY[cripto][moneda]);
        setLoading(false);
      }, 1200);
    }
    cotizarCriptomoneda();
  }, [moneda, cripto]);

  const componente = (loading) ? <Spinner/> : <Cotizacion resultado={cotizacion}/>;
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto"/>
      </div>
      <div>
        <Heading>Cotizador criptomonedas al isntante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCripto={setCripto}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;

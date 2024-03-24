import React, { useEffect, useState } from 'react'; //imr
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

// const Button = styled.button` //scb
  /* ... */
// `;

const Boton = styled.input` //scin
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;

  &:hover {
      background-color: #326AC0;
      cursor: pointer;
  }
`;


const Formulario = ( { setMoneda, setCripto } ) => {

    const [ error, setError ] = useState(false);

    const MONEDAS = [
        { codigo: 'AUD', nombre: 'Dolar Australiano'},
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlinas'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'KRW', nombre: 'Won Surcoreano'},
        { codigo: 'JPY', nombre: 'Yen Japones'},
        { codigo: 'CNY', nombre: 'Yuan Chino'},
    ];

    const [ criptos, setCriptos ] = useState([]);

    // Utilizar custom state
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    // utilizar custom hook cripto
    const [cripto, SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',criptos);

    // llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            setCriptos(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // submit
    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda.trim() === '' || cripto.trim() === '')
        {
            setError(true);
            return;
        }
        setError(false);
        setMoneda(moneda);
        setCripto(cripto);
    }
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error msg="Todos los campos son obligatirios" /> : null}
            <SelectMoneda/>
            <SelectCripto criptomonedas={criptos} />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
Formulario.propTpes = {
    setMoneda: PropTypes.func.isRequired,
    setCripto: PropTypes.func.isRequired
}
export default Formulario;
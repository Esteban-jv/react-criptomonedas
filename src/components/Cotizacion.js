import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;

  span {
      font-weight: bold;
  }
`;

const Precio = styled.p`
    font-size: 30px;
    span {
      font-weight: bold;
  }
`;




const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
Cotizacion.propTpes = {
    resultado: PropTypes.object.isRequired
}
export default Cotizacion;
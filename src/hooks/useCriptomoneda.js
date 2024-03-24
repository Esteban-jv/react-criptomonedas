import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, options) => {
    // console.warn(options)

    // state de custom hook
    const [ state, updateState ] = useState(stateInicial);
    
    const SelectCripto = () => (
        <Fragment>
            <Label>{label}: </Label>
            <Select
                onChange={e => updateState(e.target.value)}
                value={state}
            >    
            <option value=''>-- Seleccionar --</option>
                { options.map(op => (
                    <option key={op.CoinInfo.Id} value={op.CoinInfo.Name}>{op.CoinInfo.FullName}</option>
                )) }
            </Select>
        </Fragment>
    );

    // Retornar la parte de la interfaz

    return [state, SelectCripto, updateState];
}

useCriptomoneda.propTpes = {
    label: PropTypes.string.isRequired,
    stateInicial: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
}
export default useCriptomoneda;
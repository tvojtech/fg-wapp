import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #BEB7A4;
  font-size: 1rem;
  margin: 0;
  padding: 0.5rem;
  padding-left: 1rem;

  &:focus, &:active, &:hover {
    outline: none;
    font-weight: bolder;
    border-bottom: 1px solid black;
  }
`

export default StyledInput

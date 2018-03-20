import React from 'react'
import {Input} from 'rebass'

export default Input.extend`
  border: 0;
  border-bottom: 1px solid #BEB7A4;

  &:focus {
    font-weight: bolder;
    border: 0;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
`

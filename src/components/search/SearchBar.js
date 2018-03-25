import React from 'react'
import searchIcon from '../../images/search.svg'
import ButtonTransparent from '../ButtonTransparent'
import Input from '../Input'
import { Image, Flex, Box } from 'rebass'

const SearchButton = props => <ButtonTransparent {...props}><Image color="red" src={searchIcon} /></ButtonTransparent>

export default ({ inputRef, value, onValueChange, placeholder, onSearch, buttonType }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    onSearch()
  }} >
    <Box>
      <Flex align="center" justify="center">
        <Box flex={1}>
          <Input style={{width: "100%"}} innerRef={inputRef} value={value} onChange={onValueChange} placeholder={placeholder} />
        </Box>
        <SearchButton type="submit" />
      </Flex>
    </Box>
  </form>
)

import React from 'react'
import styled from 'styled-components'
import {Flex, Box} from 'rebass'
import Link from '../Link'

const SearchResults = ({ locations, selectedLocation, setSelectedLocation }) => (
  <Flex wrap={true} my={2}>
    {locations.map(loc =>
      (<Box key={loc.id} onMouseEnter={() => setSelectedLocation(loc)} onMouseLeave={() => setSelectedLocation()} mr={2}>
        <Link to={`/${loc.id}`}>
          {loc.name} / {loc.sys.country}
        </Link>
      </Box>)
    )}
  </Flex>
)

export default SearchResults

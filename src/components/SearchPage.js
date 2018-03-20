import React from 'react'
import { compose, withHandlers, lifecycle, withState } from 'recompose'
import { Box, Flex, Input, Button } from 'rebass'
import _fp from 'lodash/fp'
import qs from 'query-string'
import WeatherMap from './WeatherMap'
import withAsyncData from './withAsyncData'
import Loading from './Loading'
import Link from './Link'
import * as weatherApi from '../api/weather'

const SearchPage = ({ search, searchChange, performSearch, locations = [], selectedLocation, setSelectedLocation }) => (
  <Box>
    <form onSubmit={evt => {
      evt.preventDefault()
      performSearch()
    }} >
      <Flex>
        <Input value={search} onChange={evt => searchChange(evt.target.value)} />
        <Button type="submit">Search</Button>
      </Flex>
    </form>
    {locations.length > 0 &&
      <React.Fragment>
        <ul>
          {locations.map(loc =>
            (<li key={loc.id} onMouseEnter={() => setSelectedLocation(loc)} onMouseLeave={() => setSelectedLocation()}>
              <Link to={`/${loc.id}`}>
                {loc.name}
              </Link>
            </li>)
          )}
        </ul>
        <Box>
          <WeatherMap locations={locations} selectedLocation={selectedLocation} />
        </Box>
      </React.Fragment>}
  </Box>
)

const StatefulSearchPage = compose(
  withState("search", "searchChange", ({ location }) => qs.parse(location.search).search || ""),
  withState('selectedLocation', 'setSelectedLocation', undefined),
  withAsyncData(({ location, search }) => ({
    locations: () => {
      if (!search) {
        return
      }
      return weatherApi.searchLocations(search).then(_fp.get("list"))
    }
  })),
  withHandlers({
    performSearch: ({ history, location, refetch, search }) => () => {
      history.push({ search: qs.stringify({ ...qs.parse(location.search), search }) })
      refetch()
    }
  }
  )
)(SearchPage)

export default StatefulSearchPage

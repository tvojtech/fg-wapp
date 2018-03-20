import React from 'react'
import { compose, withStateHandlers, lifecycle, withState } from 'recompose'
import { Box, Flex, Input, Button } from 'rebass'
import _fp from 'lodash/fp'
import qs from 'query-string'
import WeatherMap from './WeatherMap'
import * as weatherApi from '../api/weather'

const SearchPage = ({ search, searchChange, performSearch, locations, selectedLocation, setSelectedLocation }) => (
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
    {locations.length > 0 && <ul>
      {locations.map(loc =>
        (<li key={loc.id} onMouseEnter={() => setSelectedLocation(loc)} onMouseLeave={() => setSelectedLocation()}>
          {loc.name}
        </li>)
      )}
    </ul>}
    <Box>
      <WeatherMap locations={locations} selectedLocation={selectedLocation} />
    </Box>
  </Box>
)

const StatefulSearchPage = compose(
  withState('locations', 'setLocations', []),
  withState('selectedLocation', 'setSelectedLocation', undefined),
  lifecycle({
    componentDidMount() {
      const { location, setLocations } = this.props
      const search = qs.parse(location.search).search || ""
      weatherApi.searchLocations(search).then(_fp.get("list")).then(setLocations)
    }
  }),
  withStateHandlers(
    ({ location }) => ({ search: qs.parse(location.search).search || "" }),
    {
      searchChange: () => (search) => ({ search }),
      performSearch: ({ search }, { history, location, setLocations }) => () => {
        history.push({ search: qs.stringify({ ...qs.parse(location.search), search }) })
        weatherApi.searchLocations(search).then(_fp.get("list")).then(setLocations)
        return { search }
      }
    }
  )
)(SearchPage)

export default StatefulSearchPage

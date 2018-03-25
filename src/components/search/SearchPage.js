import React from 'react'
import { compose, withHandlers, lifecycle, withState, withProps } from 'recompose'
import { Box, Flex, Image } from 'rebass'
import _fp from 'lodash/fp'
import qs from 'query-string'
import WeatherMap from '../WeatherMap'
import withAsyncData from '../withAsyncData'
import Loading from '../Loading'
import Input from '../Input'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import * as weatherApi from '../../api/weather'

class SearchPage extends React.Component {
  componentDidMount() {
    this.inputSearchRef.focus()
  }

  render() {
    const { searchText, searchTextChange, performSearch, locations = [], selectedLocation, setSelectedLocation } = this.props;
    return (
      <Box>
        <Box width={1}>
          <SearchBar onSearch={performSearch} value={searchText} onValueChange={evt => searchTextChange(evt.target.value)} placeholder="Search city" inputRef={ref => (this.inputSearchRef = ref)} />
        </Box>
        {locations.length > 0 &&
          <React.Fragment>
            <SearchResults locations={locations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            <Box>
              <WeatherMap locations={locations} selectedLocation={selectedLocation} />
            </Box>
          </React.Fragment>}
      </Box>
    )
  }
}

const StatefulSearchPage = compose(
  withProps(({ location }) => ({ search: qs.parse(location.search).search || "" })),
  withState("searchText", "searchTextChange", ""),
  withState('selectedLocation', 'setSelectedLocation', undefined),
  withAsyncData({
    mapFetchToProps: ({ search }) => ({
      locations: () => {
        if (!search) {
          return
        }
        return weatherApi.searchLocations(search).then(_fp.get("list"))
      }
    }),
    shouldRefetch(nextProps, oldProps) {
      if (nextProps.search !== oldProps.search) {
        return "locations"
      }
    }
  }),
  withHandlers({
    performSearch: ({ history, location, refetch, searchText }) => () => {
      history.push({ search: qs.stringify({ ...qs.parse(location.search), search: searchText }) })
    }
  }
  )
)(SearchPage)

export default StatefulSearchPage

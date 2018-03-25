import React from 'react'
import { compose, withHandlers, lifecycle, withState } from 'recompose'
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
    const { search, searchChange, performSearch, locations = [], selectedLocation, setSelectedLocation } = this.props;
    return (
      <Box>
        <Box ml="auto" width={[1, 1 / 2, 1 / 3, 1 / 4]}>
          <SearchBar onSearch={performSearch} value={search} onValueChange={evt => searchChange(evt.target.value)} placeholder="Search city" inputRef={ref => (this.inputSearchRef = ref)} />
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

const obtainSearchQueryParam = ({ location }) => qs.parse(location.search).search || ""

const StatefulSearchPage = compose(
  withState("search", "searchChange", obtainSearchQueryParam),
  withState('selectedLocation', 'setSelectedLocation', undefined),
  withAsyncData(({ location, search }) => ({
    locations: () => {
      if (!search) {
        return
      }
      return weatherApi.searchLocations(search).then(_fp.get("list"))
    }
  })),
  // fixme: after clicking on app logo search is not rerendered
  // lifecycle({
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.location.search !== this.props.location.search) {
  //       this.props.searchChange(obtainSearchQueryParam({ location: this.props.location }))
  //       this.props.refetch()
  //     }
  //   }
  // }),
  withHandlers({
    performSearch: ({ history, location, refetch, search }) => () => {
      history.push({ search: qs.stringify({ ...qs.parse(location.search), search }) })
      refetch()
    }
  }
  )
)(SearchPage)

export default StatefulSearchPage

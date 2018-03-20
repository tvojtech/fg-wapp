import React from 'react'
import { compose, withStateHandlers, lifecycle, branch, renderComponent } from 'recompose'
import { Box, Flex, Heading } from 'rebass'
import _fp from 'lodash/fp'
import withAsyncData from '../withAsyncData'
import Loading from '../Loading'
import * as weatherApi from '../../api/weather'
import TemperatureIndicator from './TemperatureIndicator'

const DetailPage = ({ weather }) => (
  <Box>
    <Heading>{weather.name}</Heading>
    <Box>
      <TemperatureIndicator weather={weather} />
    </Box>
  </Box>
)

const StatefulDetailPage = compose(
  withAsyncData(({ match: { params: { location } } }) => ({
    weather: () => weatherApi.currentWeather({ id: location })
  })),
  branch(_fp.get("loading"), renderComponent(Loading))
)(DetailPage)

export default StatefulDetailPage

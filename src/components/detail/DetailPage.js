import React from 'react'
import { compose, withStateHandlers, withHandlers, lifecycle, branch, renderComponent, withProps } from 'recompose'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import _fp from 'lodash/fp'
import qs from 'query-string'
import withAsyncData from '../withAsyncData'
import Loading from '../Loading'
import * as weatherApi from '../../api/weather'
import ButtonTransparent from '../ButtonTransparent'

const sectionProps = { w: [1, null, 1 / 3], justify: "center", align: "center" }

const WeatherItem = ({ weather: { main, weather, wind } }) => (
  <Flex wrap={true} direction="row" justify="space-between">
    <Flex {...sectionProps}>
      <Image src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} width={1} />
    </Flex>
    <Flex {...sectionProps}>
      <Text fontSize={8}>
        {Math.round(main.temp)}&deg;C
        </Text>
    </Flex>
    <Flex {...sectionProps}>
      <Text fontSize={8}>{wind.speed}&nbsp;m/s</Text>
    </Flex>
  </Flex>
)

const DetailPage = ({ weather, showForecast, forecast, onShowForecast }) => (
  <Box>
    <Flex direction="row" justify={["center", null, "flex-start"]}>
      <h1>{weather.name}</h1>
    </Flex>
    <WeatherItem weather={weather} />
    {!showForecast && onShowForecast && <Flex direction="row" justify="center">
      <ButtonTransparent onClick={onShowForecast} w={1}>Load weather forecast</ButtonTransparent>
    </Flex>}
    {showForecast && forecast
      && forecast.list.map(forecastItem => (
        <Flex column key={forecastItem.dt}>
          <Flex direction="row" justify={["center", null, "flex-start"]}>
            <h2>{new Date(forecastItem.dt_txt).toLocaleString()}</h2>
          </Flex>
          <WeatherItem weather={forecastItem} />
        </Flex>
      ))}
  </Box>
)

const StatefulDetailPage = compose(
  withProps(({ location: { search } }) => ({ showForecast: qs.parse(search).showForecast })),
  withAsyncData({
    mapFetchToProps: ({ match: { params: { location } }, showForecast }) => ({
      weather: () => weatherApi.currentWeather({ id: location }),
      forecast: () => showForecast ? weatherApi.forecast({ id: location }) : undefined,
    }),
    shouldRefetch(nextProps, oldProps) {
      if (nextProps.showForecast !== oldProps.showForecast) {
        return "forecast"
      }
    }
  }),
  withHandlers({
    onShowForecast: ({ history, location, refetch }) => () => history.push({ search: qs.stringify({ ...qs.parse(location.search), showForecast: true }) })
  }),
  branch(_fp.get("loading"), renderComponent(Loading)),
)(DetailPage)

export default StatefulDetailPage

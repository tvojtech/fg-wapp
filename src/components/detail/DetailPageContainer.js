import React from 'react'
import { compose, withStateHandlers, withHandlers, lifecycle, branch, renderComponent, withProps } from 'recompose'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import _fp from 'lodash/fp'
import qs from 'query-string'
import withAsyncData from '../withAsyncData'
import Loading from '../Loading'
import * as weatherApi from '../../api/weather'
import ButtonTransparent from '../ButtonTransparent'
import DetailPage from './DetailPage'

const DetailPageContainer = compose(
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
      return false
    }
  }),
  withHandlers({
    onShowForecast: ({ history, location, refetch }) => () => history.push({ search: qs.stringify({ ...qs.parse(location.search), showForecast: true }) })
  }),
  branch(_fp.get("loading"), renderComponent(Loading)),
)(DetailPage)

export default DetailPageContainer

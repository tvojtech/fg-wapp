import React from 'react'
import { compose, withStateHandlers, lifecycle, branch, renderComponent } from 'recompose'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import _fp from 'lodash/fp'
import withAsyncData from '../withAsyncData'
import Loading from '../Loading'
import * as weatherApi from '../../api/weather'

const sectionProps = { w: [1, null, 1 / 3], justify: "center", align: "center" }

const DetailPage = ({ weather: { name, main, weather, wind } }) => (
  <Box>
    <Flex direction="row" justify={["center", null, "flex-start"]}>
      <h1>{name}</h1>
    </Flex>
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
  </Box>
)

const StatefulDetailPage = compose(
  withAsyncData(({ match: { params: { location } } }) => ({
    weather: () => weatherApi.currentWeather({ id: location })
  })),
  branch(_fp.get("loading"), renderComponent(Loading))
)(DetailPage)

export default StatefulDetailPage

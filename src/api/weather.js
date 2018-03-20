import request from 'superagent'
import _fp from 'lodash/fp'

const weatherApiKey = '39d717bb99e1175215f4bcfa8f2cbb37'

const executeWeatherGet = (url, params = {}) => request.get(url).query({ ...params, appid: weatherApiKey }).then(_fp.get("body"))

export const searchLocations = location => executeWeatherGet(`api/weather/find`, { q: location })

export const currentWeather = params => executeWeatherGet(`api/weather/weather`, { ...params, units: "metric" })

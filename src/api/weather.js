import request from 'superagent'
import _fp from 'lodash/fp'

const urlBase = "https://api.openweathermap.org/data/2.5"

const weatherApiKey = '39d717bb99e1175215f4bcfa8f2cbb37'

let executeWeatherGet = (url, params = {}) => request.get(url).query({ ...params, appid: weatherApiKey }).then(_fp.get("body"))

if (process.env.NODE_ENV !== "development") {
  const oldExecuteWeatherGet = executeWeatherGet;
  executeWeatherGet = (url, params) => oldExecuteWeatherGet(urlBase + url.replace("api/weather", ""), params)
}

export const searchLocations = location => executeWeatherGet(`api/weather/find`, { q: location })

export const currentWeather = params => executeWeatherGet(`api/weather/weather`, { ...params, units: "metric" })

export const forecast = params => executeWeatherGet(`api/weather/forecast`, { ...params, units: "metric" })

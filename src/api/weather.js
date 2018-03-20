import request from 'superagent'
import _fp from 'lodash/fp'

const executeRequest = url => request.get(url).then(_fp.get("body"))

const weatherApiKey = '39d717bb99e1175215f4bcfa8f2cbb37'

export const searchLocations = location => executeRequest(`api/weather/find?q=${location}&appid=${weatherApiKey}`)

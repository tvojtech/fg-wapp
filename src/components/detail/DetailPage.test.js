import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import DetailPage from './DetailPage';

const weatherData = { "coord": { "lon": 12.92, "lat": 49.5 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "base": "stations", "main": { "temp": 5, "pressure": 1008, "humidity": 65, "temp_min": 5, "temp_max": 5 }, "visibility": 10000, "wind": { "speed": 1, "deg": 100 }, "clouds": { "all": 0 }, "dt": 1522000800, "sys": { "type": 1, "id": 5891, "message": 0.0031, "country": "CZ", "sunrise": 1521953948, "sunset": 1521998994 }, "id": 3076586, "name": "Okres Domažlice", "cod": 200 }

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
})

it('should render current weather', () => {
  const wrapper = shallow(<DetailPage weather={weatherData} showForecast={false} />)
  expect(wrapper.find("WeatherItem")).toHaveLength(1);
});

it('should render current weather', () => {
  const wrapper = shallow(<DetailPage weather={weatherData} showForecast={false} forecast={{ list: [weatherData, weatherData] }} />)
  expect(wrapper.find("WeatherItem")).toHaveLength(1);
});

it('should render current weather and forecast', () => {
  const wrapper = shallow(<DetailPage weather={weatherData} showForecast={true} forecast={{ list: [weatherData, weatherData] }} />)
  expect(wrapper.find("WeatherItem")).toHaveLength(3);
});

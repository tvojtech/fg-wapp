# fg-wapp

Simple weather app

Try https://stupefied-galileo-d94d2e.netlify.com/ (May not work)

## Prerequisites
- Node.js - tested with version 9.4.0 

## Development
- install dependencies using `npm install` or `yarn install`
- run app with `npm start` or `yarn start`
- open url `http://localost:3000` in browser
- to run tests run `npm test` or `yarn test`

## Production
- build production ready version using `npm run build` or `yarn build`

## TODOs

- currently the application does not support internationalization, all strings are hardcoded in code
- the app does not handle errors
- api key for openweathermap is hardcoded in [src/api/weather.js](./src/api/weather.js) file.

import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const toGMapCoords = coords => ({ lat: coords.lat, lng: coords.lon })

const WeatherMap = ({ locations, selectedLocation }) => (
  <GoogleMap
    center={selectedLocation ? toGMapCoords(selectedLocation.coord) : { lat: 50.1474553, lng: 15.1249218 }}
    zoom={selectedLocation ? 7 : 2}
  >
    {locations.map(loc => <Marker key={loc.id} position={toGMapCoords(loc.coord)} />)}
  </GoogleMap>
)

export default
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `400px` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(WeatherMap)

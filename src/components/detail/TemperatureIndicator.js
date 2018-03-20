import React from 'react'

export default ({ weather: { main: { temp } } }) => <div>{temp}</div>

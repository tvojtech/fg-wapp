import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Toolbar, Flex, BackgroundImage, Image } from 'rebass'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Link from './components/Link'

import SearchPage from './components/SearchPage'
import DetailPage from './components/detail/DetailPage';

const CustomizedToolbar = Toolbar.extend`
  background-color: #BEB7A4;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); 
`

const pageWithLayout = WrappedComponent => props => (
  <Box>
    <CustomizedToolbar p={1}>
      <Link to="/"><Box w="4rem" m={1}><BackgroundImage m={1} src={logo} /></Box></Link>
    </CustomizedToolbar>
    <Box>
      <WrappedComponent {...props} />
    </Box>
  </Box>
)

const SearchPageWithLayout = pageWithLayout(SearchPage)
const DetailPageWithLayout = pageWithLayout(DetailPage)

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={SearchPageWithLayout} />
        <Route path="/:location" component={DetailPageWithLayout} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

export default App;

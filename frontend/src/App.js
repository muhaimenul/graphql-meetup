import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

import MainNavigation from './components/Navigation/MainNavigation'

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <MainNavigation />
          <main>
            <Routes />
          </main>
        </React.Fragment>
      </Router>
    )
  }
}
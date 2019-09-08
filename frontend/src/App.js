import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={null} />
        <Route path="/auth" component={null} />
        <Route path="/events" component={null} />
        <Route path="/bookings" component={null} />
      </Router>
    )
  }
}